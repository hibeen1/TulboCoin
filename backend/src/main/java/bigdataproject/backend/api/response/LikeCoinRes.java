package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.LikeCoin;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LikeCoinRes {
    String coinName;
    String coinCode;

    public static LikeCoinRes of(LikeCoin likeCoin){
        LikeCoinRes res = new LikeCoinRes();
        res.setCoinName(likeCoin.getCoin().getCoinName());
        res.setCoinCode(likeCoin.getCoin().getCoinCode());
        return res;
    }
}
