package bigdataproject.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Enroll {

    @Id
    @GeneratedValue
    @Column(name = "enroll_seq")
    private Long enrollSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne
    @JoinColumn(name = "contest_seq")
    private Contest contest;

}
