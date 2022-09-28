package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.SellReq;
import bigdataproject.backend.api.response.SellRes;
import bigdataproject.backend.db.entity.Sell;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import bigdataproject.backend.db.repository.SellRepository;
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
public class SellServiceImpl implements SellService{

    private final SellRepository sellRepository;

    private final UserRepository userRepository;

    private final WalletRepository walletRepository;

    @Override
    @Transactional
    public SellRes postSellRecord(SellReq sellReq) {
        User user;
        Optional<User> o = userRepository.findById(sellReq.getUserSeq());
        if (!o.isPresent()){
            return null;
        }else {
            user = o.get();
        }

        Sell newSell = Sell.builder()
                .user(user)
                .sellCoinName(sellReq.getSellCoinName())
                .sellCoinAmount(sellReq.getSellCoinAmount())
                .sellCoinPrice(sellReq.getSellCoinPrice())
                .build();
        sellRepository.save(newSell);

        Wallet wallet = walletRepository.findWalletUserCoin(
                user,
                sellReq.getSellCoinName()
        );

        if (wallet == null){
            return null;
        } else if(wallet.getCoinAmount() < sellReq.getSellCoinAmount()) {
            return null;
        } else {
            wallet.setCoinAmount(wallet.getCoinAmount()-sellReq.getSellCoinAmount());
            user.setBalance(user.getBalance()+(sellReq.getSellCoinPrice()*sellReq.getSellCoinAmount()));
            walletRepository.save(wallet);
            userRepository.save(user);
        }

        SellRes sellRes = SellRes.of(newSell);

        return sellRes;
    }
}
