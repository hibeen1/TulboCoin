package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.SparkService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;

@RestController
@RequestMapping("/spark")
public class SparkController {

    @Autowired
    SparkService sparkService;

    @GetMapping
    @ApiOperation(value = "지난 시간 거래 트래픽 조회", notes = "input : int (ex. 10, 30, 60) output : Map 형식 {\"KRW-BTC\" : 29, ...}")
    public Map<String, Long> count(@RequestParam(required = true) int time) {
        LocalDateTime ldt = LocalDateTime.now(ZoneId.of("UTC")).minusMinutes(time);
        LocalDateTime now = LocalDateTime.now();
        return sparkService.getCount(ldt, now, time/10);
    }
}
