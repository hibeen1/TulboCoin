package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.Coin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinRepository extends JpaRepository<Coin, Long> {

    Coin findByCoinName(String coinName);
}
