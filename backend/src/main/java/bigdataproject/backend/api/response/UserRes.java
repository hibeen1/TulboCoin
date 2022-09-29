package bigdataproject.backend.api.response;

import bigdataproject.backend.common.model.response.BaseResponseBody;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class UserRes {
    Long userSeq;
    String userId;
    String email;
    double balance;
    String imagePath;
    LocalDateTime investStartTime;
//    List<WalletRes> walletList;

    public static UserRes of(User user){
        UserRes res = new UserRes();
        res.setUserSeq(user.getUserSeq());
        res.setUserId(user.getUserId());
        res.setEmail(user.getEmail());
        res.setBalance(user.getBalance());
        res.setImagePath(user.getImagePath());
        res.setInvestStartTime(user.getInvestStartTime());
//        List<WalletRes> newWalletList = new ArrayList<>();
//        for(Wallet wallet : user.getWalletList()){
//            WalletRes walletRes = WalletRes.of(wallet);
//            newWalletList.add(walletRes);
//        }
//        res.setWalletList(newWalletList);
        return res;
    }
}
