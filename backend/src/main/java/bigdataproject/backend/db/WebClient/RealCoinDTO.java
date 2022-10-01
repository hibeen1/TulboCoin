package bigdataproject.backend.db.WebClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RealCoinDTO {
    private String market;
    private double trade_price;
    private Long timestamp;
}
