package bigdataproject.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Table
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class LikeCoin {
    @Id
    @GeneratedValue
    @Column(name = "like_coin_seq")
    private Long likeCoinSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne
    @JoinColumn(name = "coin_seq")
    private Coin coin;
}
