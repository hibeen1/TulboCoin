package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.Buy;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuyRes {
    String buyCoinName;
    Double buyCoinAmount;
    int buyCoinPrice;

    public static BuyRes of(Buy buy){
        BuyRes res = new BuyRes();
        res.setBuyCoinName(buy.getBuyCoinName());
        res.setBuyCoinPrice(buy.getBuyCoinPrice());
        res.setBuyCoinAmount(buy.getBuyCoinAmount());
        return res;
    }
}
