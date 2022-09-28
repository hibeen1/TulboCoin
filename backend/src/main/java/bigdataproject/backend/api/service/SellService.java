package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.SellReq;
import bigdataproject.backend.api.response.SellRes;

public interface SellService {
    SellRes postSellRecord(SellReq sellReq);
}
