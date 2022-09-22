package bigdataproject.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long user_seq;

    @Column(name = "id", unique = true, nullable = false)
    private String userId;

    @Column(name = "email", nullable = false)
    private String email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", nullable = false)
    String password;


    @Column(name = "balance")
    private long balance;

    @Column(name = "image_path")
    private String imagePath;
}
