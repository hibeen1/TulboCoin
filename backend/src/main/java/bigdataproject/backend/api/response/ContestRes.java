package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.Contest;
import bigdataproject.backend.db.entity.ContestStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ContestRes {
    Long contestSeq;
    LocalDateTime startTime;
    LocalDateTime endTime;
    double seedBalance;
    ContestStatus contestStatus;
    int contestUsersNum;

    public static ContestRes of(Contest contest){
        ContestRes res = new ContestRes();
        res.setContestSeq(contest.getContestSeq());
        res.setStartTime(contest.getStartTime());
        res.setEndTime(contest.getEndTime());
        res.setSeedBalance(contest.getSeedBalance());
        res.setContestStatus(contest.getContestStatus());
        if (contest.getContestUsers() == null){
            res.setContestUsersNum(0);
        }else {
            res.setContestUsersNum(contest.getContestUsers().size());
        }
        return res;
    }
}
