package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.Contest;
import bigdataproject.backend.db.entity.ContestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {

    @Query(value = "select * from contest where contest_status = ?1", nativeQuery = true)
    Contest findContestByStatus(String contestStatus);
}
