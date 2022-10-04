package bigdataproject.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Sell {

    @Id
    @GeneratedValue
    @Column(name = "sell_seq")
    private Long sellSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "sell_coin_name")
    private String sellCoinName;

    @Column(name = "sell_coin_code")
    private String sellCoinCode;

    @Column(name = "sell_coin_amount")
    private Double sellCoinAmount;

    @Column(name = "sell_coin_price")
    private int sellCoinPrice;

    @CreationTimestamp
    @Column(name = "sell_time")
    private LocalDateTime sellTime;
}
