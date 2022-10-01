package bigdataproject.backend.api.service;

import bigdataproject.backend.api.response.RankRes;

import java.util.List;

public interface RankService {
    List<RankRes> getRankList();
}
