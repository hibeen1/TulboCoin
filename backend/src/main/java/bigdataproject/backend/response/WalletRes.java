package bigdataproject.backend.response;

import bigdataproject.backend.db.entity.Wallet;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WalletRes {
    String coinName;
    Double coinAmount;
    Double coinAverage;

    public static WalletRes of(Wallet wallet){
        WalletRes res = new WalletRes();
        res.setCoinName(wallet.getCoinName());
        res.setCoinAverage(wallet.getCoinAverage());
        res.setCoinAmount(wallet.getCoinAmount());
        return res;
    }
}
