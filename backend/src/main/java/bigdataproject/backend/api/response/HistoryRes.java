package bigdataproject.backend.api.response;

import bigdataproject.backend.db.entity.History;
import bigdataproject.backend.db.entity.HistoryType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class HistoryRes {
    Long historySeq;
    String historyCoinName;
    String historyCoinCode;
    double historyCoinAmount;
    int historyCoinPrice;
    HistoryType historyType;
    LocalDateTime historyTime;

    public static HistoryRes of(History history){
        HistoryRes historyRes = new HistoryRes();
        historyRes.setHistorySeq(history.getHistorySeq());
        historyRes.setHistoryCoinName(history.getHistoryCoinName());
        historyRes.setHistoryCoinCode(history.getHistoryCoinCode());
        historyRes.setHistoryCoinAmount(history.getHistoryCoinAmount());
        historyRes.setHistoryCoinPrice(history.getHistoryCoinPrice());
        historyRes.setHistoryType(history.getHistoryType());
        historyRes.setHistoryTime(history.getHistoryTime());
        return historyRes;
    }
}
