package bigdataproject.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Entity
@Getter
@Setter
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Wallet {

    @Id
    @GeneratedValue
    @Column(name = "wallet_seq")
    private Long walletSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "wallet_coin_name", nullable = false)
    private String coinName;

    @Column(name = "wallet_coin_amount")
    private Double coinAmount;

    @Column(name = "wallet_coin_average")
    private Double coinAverage;



}
