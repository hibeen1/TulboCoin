package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.Buy;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BuyRecordRes {
    String buyCoinName;
    Double buyCoinAmount;
    int buyCoinPrice;
    LocalDateTime buyTime;

    public static BuyRecordRes of(Buy buy){
        BuyRecordRes res = new BuyRecordRes();
        res.setBuyCoinName(buy.getBuyCoinName());
        res.setBuyCoinPrice(buy.getBuyCoinPrice());
        res.setBuyCoinAmount(buy.getBuyCoinAmount());
        res.setBuyTime(buy.getBuyTime());
        return res;
    }
}
