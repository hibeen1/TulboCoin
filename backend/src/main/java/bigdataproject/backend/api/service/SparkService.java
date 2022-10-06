package bigdataproject.backend.api.service;

import bigdataproject.backend.db.WebClient.WordCountDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface SparkService {
    List<WordCountDTO> getCount(LocalDateTime ldt, LocalDateTime now, int cnt);
}
