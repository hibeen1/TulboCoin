package bigdataproject.backend.db.WebClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WordCountDTO {
    private String value;
    private Long count;
}
