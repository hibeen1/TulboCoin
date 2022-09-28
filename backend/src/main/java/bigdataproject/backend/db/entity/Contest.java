package bigdataproject.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Contest {
    @Id
    @GeneratedValue
    @Column(name = "contest_seq")
    private Long contestSeq;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "seed_balance")
    private double seedBalance;

    @Enumerated(EnumType.STRING)
    @Column(name = "contest_status")
    private ContestStatus contestStatus;

    @OneToMany(mappedBy = "contest", cascade = CascadeType.ALL)
    private List<Enroll> contestUsers = new ArrayList<>();

}
