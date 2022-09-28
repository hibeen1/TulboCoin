package bigdataproject.backend.api.service;


import bigdataproject.backend.api.response.ContestRes;
import bigdataproject.backend.db.entity.Contest;

import java.util.List;

public interface ContestService {
    
    Boolean isRunning();

    void createContest();

    List<ContestRes> getContestResList();
}
