package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.SellReq;
import bigdataproject.backend.api.response.SellRecordRes;
import bigdataproject.backend.api.response.SellRes;
import bigdataproject.backend.db.entity.User;

import java.util.List;

public interface SellService {
    SellRes postSellRecord(User user, SellReq sellReq);

    List<SellRecordRes> getSellRecord(User user);
}
