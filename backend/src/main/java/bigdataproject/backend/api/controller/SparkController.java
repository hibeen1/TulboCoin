package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.SparkService;
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
    public Map<String, Long> count(@RequestParam(required = true) int time) {
        LocalDateTime ldt = LocalDateTime.now(ZoneId.of("UTC")).minusMinutes(time);
        LocalDateTime now = LocalDateTime.now();
        return sparkService.getCount(ldt, now, time/10);
    }
}
