package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.CoinReq;
import bigdataproject.backend.api.response.LikeCoinRes;
import bigdataproject.backend.db.entity.User;

import java.util.List;

public interface LikeService {

    List<LikeCoinRes> getLikeCoinList(User user);

    LikeCoinRes postLikeCoin(User user, CoinReq coinReq);
}
