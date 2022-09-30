package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.Sell;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SellRecordRes {
    String sellCoinName;
    String sellCoincode;
    Double sellCoinAmount;
    int sellCoinPrice;
    LocalDateTime sellTime;

    public static SellRecordRes of(Sell sell){
        SellRecordRes res = new SellRecordRes();
        res.setSellCoinName(sell.getSellCoinName());
        res.setSellCoincode(sell.getSellCoinCode());
        res.setSellCoinPrice(sell.getSellCoinPrice());
        res.setSellCoinAmount(sell.getSellCoinAmount());
        res.setSellTime(sell.getSellTime());
        return res;
    }
}
