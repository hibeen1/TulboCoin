package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.response.ContestRes;
import bigdataproject.backend.api.service.ContestService;
import bigdataproject.backend.db.entity.Contest;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("contest")
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class ContestController {

    private final ContestService contestService;

    @GetMapping()
    @ApiOperation(value = "대회 목록", notes = "대회 목록 불러오기")
    public ResponseEntity<List<ContestRes>> getContest(){
        HttpStatus status;

        if(!contestService.isRunning()) {
            log.info("contestService.isRunning = false 나옴");
            contestService.createContest();
        }

        List<ContestRes> contestResList = contestService.getContestResList();
        log.info("contestResList 가져옴");
        log.info(contestResList.toString());
        status = HttpStatus.OK;
        return new ResponseEntity<List<ContestRes>>(contestResList, status);

    }
}
