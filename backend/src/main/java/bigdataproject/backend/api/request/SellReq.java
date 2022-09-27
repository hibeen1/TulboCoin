package bigdataproject.backend.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellReq {
    Long userSeq;
    String sellCoinName;
    Double sellCoinAmount;
    int sellCoinPrice;
}
