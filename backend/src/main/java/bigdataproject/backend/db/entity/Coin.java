package bigdataproject.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Table
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Coin {
    @Id
    @GeneratedValue
    @Column(name = "coin_seq")
    private Long coinSeq;

    @Column(name = "coin_name")
    private String coinName;

    @Column(name = "coin_code")
    private String coinCode;

    @OneToMany(mappedBy = "coin", cascade = CascadeType.ALL)
    private List<LikeCoin> likeUserList;
}
