package bigdataproject.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Buy {
    @Id
    @GeneratedValue
    @Column(name = "buy_seq")
    private Long buySeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "buy_coin_name")
    private String buyCoinName;

    @Column(name = "buy_coin_code")
    private String buyCoinCode;

    @Column(name = "buy_coin_amount")
    private Double buyCoinAmount;

    @Column(name = "buy_coin_price")
    private int buyCoinPrice;

    @CreationTimestamp
    @Column(name = "buy_time")
    private LocalDateTime buyTime;

}
