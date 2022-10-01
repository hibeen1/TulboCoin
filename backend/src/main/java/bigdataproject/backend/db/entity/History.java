package bigdataproject.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class History {
    @Id
    @GeneratedValue
    @Column(name = "history_seq")
    private Long historySeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "history_coin_name")
    private String historyCoinName;

    @Column(name = "history_coin_code")
    private String historyCoinCode;

    @Column(name = "history_coin_amount")
    private Double historyCoinAmount;

    @Column(name = "history_coin_price")
    private int historyCoinPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "history_type")
    private HistoryType historyType;

    @CreationTimestamp
    @Column(name = "history_time")
    private LocalDateTime historyTime;
}
