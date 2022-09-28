package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollRepository extends JpaRepository<Enroll, Long> {
}
