package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RankRes {
    UserRes user;
    List<WalletRes> walletList;
    double expectedBalance;
    double percent;
}
