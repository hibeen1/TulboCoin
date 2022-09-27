package bigdataproject.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "id", unique = true, nullable = false)
    private String userId;

    @Column(name = "email", nullable = false)
    private String email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", nullable = false)
    String password;


    @Column(name = "balance")
    private double balance;

    @Column(name = "image_path")
    private String imagePath;

    @OneToMany(mappedBy = "user")
    private List<Wallet> walletList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Buy> buyList = new ArrayList<>();

}
