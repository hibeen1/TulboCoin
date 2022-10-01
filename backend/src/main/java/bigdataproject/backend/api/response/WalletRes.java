package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.Wallet;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WalletRes {
    String coinName;
    String coinCode;
    Double coinAmount;
    Double coinAverage;

    public static WalletRes of(Wallet wallet){
        WalletRes res = new WalletRes();
        res.setCoinName(wallet.getCoinName());
        res.setCoinCode(wallet.getCoinCode());
        res.setCoinAverage(wallet.getCoinAverage());
        res.setCoinAmount(wallet.getCoinAmount());
        return res;
    }
}
