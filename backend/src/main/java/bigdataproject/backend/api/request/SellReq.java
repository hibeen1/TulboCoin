package bigdataproject.backend.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellReq {
    String sellCoinName;
    String sellCoinCode;
    Double sellCoinAmount;
    int sellCoinPrice;
}
