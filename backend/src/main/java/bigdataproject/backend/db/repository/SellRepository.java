package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.Buy;
import bigdataproject.backend.db.entity.Sell;
import bigdataproject.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellRepository extends JpaRepository<Sell, Long> {
    List<Sell> findAllByUser(User user);
}
