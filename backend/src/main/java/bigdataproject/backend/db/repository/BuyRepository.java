package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.Buy;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepository extends JpaRepository<Buy, Long> {
    List<Buy> findAllByUser(User user);
}
