package bigdataproject.backend.api.service;

import bigdataproject.backend.db.entity.Contest;
import bigdataproject.backend.db.entity.Enroll;
import bigdataproject.backend.db.repository.ContestRepository;
import bigdataproject.backend.db.repository.EnrollRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class WalletServiceImplTest {


    @Test
    void getAllWallets() {

        Contest contest = Contest.builder()
                .seedBalance(1000)
                .build();

        System.out.println(contest.toString());




    }
}