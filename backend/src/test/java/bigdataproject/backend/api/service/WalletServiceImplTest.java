package bigdataproject.backend.api.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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