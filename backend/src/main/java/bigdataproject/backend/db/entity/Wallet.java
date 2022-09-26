package bigdataproject.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table
public class Wallet {

    @Id
    @GeneratedValue
    @Column(name = "wallet_seq")
    private Long walletSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "wallet_coin_name")
    private String coinName;

    @Column(name = "wallet_coin_amount")
    private Double coinAmount;

    @Column(name = "wallet_coin_average")
    private Double coinAverage;

}
