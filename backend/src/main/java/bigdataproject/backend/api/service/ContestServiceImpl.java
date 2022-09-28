package bigdataproject.backend.api.service;

import bigdataproject.backend.api.response.ContestRes;
import bigdataproject.backend.db.entity.Contest;
import bigdataproject.backend.db.repository.ContestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static bigdataproject.backend.db.entity.ContestStatus.RUNNING;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

    private final ContestRepository contestRepository;

    @Override
    public Boolean isRunning() {
        log.info("isRunning 함수 실행됌");
        Boolean contestIsRunning = false;
        Contest contest = contestRepository.findContestByStatus("RUNNING");
        if (contest != null){
            log.info("contestRepo에서 값이 있었음");
            contestIsRunning = true;
        }
        return contestIsRunning;
    }

    @Override
    @Transactional
    public void createContest() {
        log.info("대회 생성함");
        Contest contest = Contest.builder()
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now().plusDays(7))
                .seedBalance(10000000)
                .contestStatus(RUNNING)
                .build();

        contestRepository.save(contest);
        log.info("대회 저장함");
    }

    @Override
    public List<ContestRes> getContestResList() {
        log.info("getContestResList 실행 : 대회 목록 가지러 옴");
        List<Contest> contestList = contestRepository.findAll();
        List<ContestRes> contestResList= new ArrayList<>();
        for (Contest contest : contestList){
            ContestRes res = ContestRes.of(contest);
            contestResList.add(res);
        }
        return contestResList;
    }
}
