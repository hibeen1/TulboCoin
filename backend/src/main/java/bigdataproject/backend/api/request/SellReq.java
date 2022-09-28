package bigdataproject.backend.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellReq {
    String sellCoinName;
    Double sellCoinAmount;
    int sellCoinPrice;
}
