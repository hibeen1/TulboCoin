package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.BuyReq;
import bigdataproject.backend.api.response.BuyRes;
import bigdataproject.backend.db.entity.Buy;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import bigdataproject.backend.db.repository.BuyRepository;
import bigdataproject.backend.db.repository.UserRepository;
import bigdataproject.backend.db.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BuyServiceImpl implements BuyService{

    private final UserRepository userRepository;

    private final BuyRepository buyRepository;

    private final WalletRepository walletRepository;

    @Override
    @Transactional
    public BuyRes postBuyRecord(BuyReq buyReq) {
//        Optional<User> o = userRepository.findById((buyReq.getUserSeq()));
//        if (o.isPresent()) {
//
//        } else {
//            User user = o.get();
//        }
        //유저가 없을 경우
        if (!userRepository.findById(buyReq.getUserSeq()).isPresent()){
            return null;
        }
        User user = userRepository.findById(buyReq.getUserSeq()).get();

        //해당 유저의 balance와 구매 금액 비교
        if (user.getBalance() < buyReq.getBuyCoinPrice()*buyReq.getBuyCoinAmount()){
            return null;
        }

        //user의 balance를 감소시켜야함
        //set을 쓰면 안좋지만 builder나 생성자는 아예 새로운 객체를 만들어서 써야하기 때문에 귀찮다

        user.setBalance(user.getBalance()-(buyReq.getBuyCoinPrice()*buyReq.getBuyCoinAmount()));

        //매수 기록 저장
        Buy newBuy = Buy.builder()
                .user(user)
                .buyCoinName(buyReq.getBuyCoinName())
                .buyCoinAmount(buyReq.getBuyCoinAmount())
                .buyCoinPrice(buyReq.getBuyCoinPrice())
                .build();
        log.info(buyReq.getBuyCoinName() + "매수요청 코인이름");
        buyRepository.save(newBuy);

        //산 코인이 wallet에 존재하는지 안하는지 확인후
        //평균을 내어서 새로 저장해야함
        Wallet wallet = walletRepository.
                findWalletUserCoin(
                user,
                buyReq.getBuyCoinName());

        if(wallet != null){
            log.info(wallet.getCoinName() + "지갑 코인이름");
        }else {
            log.info("wallet = null");
        }
        double buyTotal = buyReq.getBuyCoinAmount()*buyReq.getBuyCoinPrice();;
        double walletTotal;
        double newAmount;

        //지갑에 매수 요청 들어온 코인이 존재하지 않는다면
        if (wallet == null){
            walletTotal = 0;
            newAmount = buyReq.getBuyCoinAmount();
            Wallet newWallet = Wallet.builder()
                    .user(userRepository.findById(buyReq.getUserSeq()).get())
                    .coinName(buyReq.getBuyCoinName())
                    .coinAmount(newAmount)
                    .coinAverage((buyTotal+walletTotal)/newAmount)
                    .build();
            walletRepository.save(newWallet);
        } //지갑에 매수 요청 들어온 코인이 존재한다면
        else {
            walletTotal = wallet.getCoinAmount()*wallet.getCoinAverage();
            newAmount = buyReq.getBuyCoinAmount()+wallet.getCoinAmount();
            Wallet modifiedWallet = Wallet.builder()
                    .walletSeq(wallet.getWalletSeq())
                    .user(wallet.getUser())
                    .coinName(wallet.getCoinName())
                    .coinAmount(newAmount)
                    .coinAverage((buyTotal+walletTotal)/newAmount)
                    .build();
            walletRepository.save(modifiedWallet);
        }

        //응답 newBuy로 제작
        BuyRes buyRes = BuyRes.of(newBuy);

        return buyRes;
    }
}
