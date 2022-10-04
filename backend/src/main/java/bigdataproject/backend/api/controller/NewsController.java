package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.NewsService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("news")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
public class NewsController {
    private final NewsService newsService;

    @GetMapping("{query}")
    @ApiOperation(value = "네이버 뉴스 가져오기", notes = "검색어를 받아서 최신 20개의 뉴스를 반환함")
    public ResponseEntity<?> news(@PathVariable String query){
        HttpStatus status;

        LinkedHashMap res = newsService.conveyNews(query);

        status = HttpStatus.OK;

        return new ResponseEntity<LinkedHashMap>((LinkedHashMap<String, String>) res, status);
    }
}
