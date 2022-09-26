package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.BuyReq;
import bigdataproject.backend.api.response.BuyRes;

public interface BuyService {
    BuyRes postBuyRecord(BuyReq buyReq);
}
