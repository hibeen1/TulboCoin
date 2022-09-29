package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.CoinReq;
import bigdataproject.backend.api.response.LikeCoinRes;
import bigdataproject.backend.db.entity.Coin;
import bigdataproject.backend.db.entity.LikeCoin;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.repository.CoinRepository;
import bigdataproject.backend.db.repository.LikeCoinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService{

    private final LikeCoinRepository likeCoinRepository;

    private final CoinRepository coinRepository;

    @Override
    public List<LikeCoinRes> getLikeCoinList(User user) {
        List<LikeCoin> likeCoinList = likeCoinRepository.findAllByUser(user);

        List<LikeCoinRes> res = new ArrayList<>();
        for (LikeCoin likeCoin : likeCoinList){
            LikeCoinRes likeCoinRes = LikeCoinRes.of(likeCoin);
            res.add(likeCoinRes);
        }
        return res;
    }

    @Override
    @Transactional
    public LikeCoinRes postLikeCoin(User user, CoinReq coinReq) {
        Coin coin = coinRepository.findByCoinName(coinReq.getCoinName());
        if (coin == null){
            Coin newCoin = Coin.builder()
                    .coinName(coinReq.getCoinName())
                    .coinCode(coinReq.getCoinCode())
                    .build();
            coinRepository.save(newCoin);
            coin = newCoin;
        }
        LikeCoin likeCoin = LikeCoin.builder()
                .user(user)
                .coin(coin)
                .build();
        likeCoinRepository.save(likeCoin);
        LikeCoinRes likeCoinRes = LikeCoinRes.of(likeCoin);

        return likeCoinRes;
    }
}
