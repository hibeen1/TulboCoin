package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.BuyReq;
import bigdataproject.backend.api.response.BuyRecordRes;
import bigdataproject.backend.api.response.BuyRes;
import bigdataproject.backend.db.entity.User;

import java.util.List;

public interface BuyService {
    List<BuyRecordRes> getBuyRecord(User user);
    BuyRes postBuyRecord(BuyReq buyReq);
}
