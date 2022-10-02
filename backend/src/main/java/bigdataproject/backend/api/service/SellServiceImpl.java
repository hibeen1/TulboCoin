package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.SellReq;
import bigdataproject.backend.api.response.BuyRecordRes;
import bigdataproject.backend.api.response.SellRecordRes;
import bigdataproject.backend.api.response.SellRes;
import bigdataproject.backend.db.entity.*;
import bigdataproject.backend.db.repository.HistoryRepository;
import bigdataproject.backend.db.repository.SellRepository;
import bigdataproject.backend.db.repository.UserRepository;
import bigdataproject.backend.db.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellServiceImpl implements SellService{

    private final SellRepository sellRepository;

    private final UserRepository userRepository;

    private final WalletRepository walletRepository;

    private final HistoryRepository historyRepository;

    @Override
    @Transactional
    public SellRes postSellRecord(User user, SellReq sellReq) {

        Sell newSell = Sell.builder()
                .user(user)
                .sellCoinName(sellReq.getSellCoinName())
                .sellCoinCode(sellReq.getSellCoinCode())
                .sellCoinAmount(sellReq.getSellCoinAmount())
                .sellCoinPrice(sellReq.getSellCoinPrice())
                .build();
        sellRepository.save(newSell);

        History history = History.builder()
                .user(user)
                .historyCoinName(sellReq.getSellCoinName())
                .historyCoinCode(sellReq.getSellCoinCode())
                .historyCoinAmount(sellReq.getSellCoinAmount())
                .historyCoinPrice(sellReq.getSellCoinPrice())
                .historyType(HistoryType.SELL)
                .build();
        historyRepository.save(history);

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
            userRepository.save(user);
            if (wallet.getCoinAmount() == 0){
                walletRepository.delete(wallet);
            }else {
                walletRepository.save(wallet);
            }
        }

        SellRes sellRes = SellRes.of(newSell);

        return sellRes;
    }

    @Override
    public List<SellRecordRes> getSellRecord(User user) {
        List<Sell> sellList = sellRepository.findAllByUser(user);
        List<SellRecordRes> sellRecordResList = new ArrayList<>();
        for (Sell sell : sellList){
            SellRecordRes sellRecordRes = SellRecordRes.of(sell);
            sellRecordResList.add(sellRecordRes);
        }
        return sellRecordResList;

    }
}
