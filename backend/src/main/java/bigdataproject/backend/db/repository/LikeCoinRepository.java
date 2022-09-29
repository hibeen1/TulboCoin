package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.LikeCoin;
import bigdataproject.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeCoinRepository extends JpaRepository<LikeCoin, Long> {
    List<LikeCoin> findAllByUser(User user);
}
