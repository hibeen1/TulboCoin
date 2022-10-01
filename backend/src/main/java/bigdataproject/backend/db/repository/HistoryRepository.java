package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.History;
import bigdataproject.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findAllByUserOrderByHistoryTimeDesc(User user);
    void deleteAllByUser(User user);
}
