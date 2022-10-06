package bigdataproject.backend.api.service;

import java.time.LocalDateTime;
import java.util.Map;

public interface SparkService {
    Map<String, Long> getCount(LocalDateTime ldt, LocalDateTime now, int cnt);
}
