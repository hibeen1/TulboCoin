package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.SparkService;
import bigdataproject.backend.db.WebClient.WordCountDTO;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping("/spark")
@CrossOrigin
public class SparkController {

    @Autowired
    SparkService sparkService;

    @GetMapping
    @ApiOperation(value = "지난 시간 거래 트래픽 조회", notes = "input : int (ex. 10, 30, 60) output : Map 형식 {\"KRW-BTC\" : 29, ...}")
    public List<WordCountDTO> count(@RequestParam(required = true) int time) {
        LocalDateTime ldt = LocalDateTime.now(ZoneId.of("UTC")).minusMinutes(time);
        LocalDateTime now = LocalDateTime.now();
        return sparkService.getCount(ldt, now, time/10);
    }
}
