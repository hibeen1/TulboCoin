package bigdataproject.backend.api.request;

import bigdataproject.backend.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuyReq {
    String buyCoinName;
    Double buyCoinAmount;
    int buyCoinPrice;
}
