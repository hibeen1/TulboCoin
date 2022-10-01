package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("news")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
public class NewsController {
    private final NewsService newsService;

    @GetMapping("{query}")
    public ResponseEntity<?> news(@PathVariable String query){
        HttpStatus status;

        Object res = newsService.conveyNews(query);

        status = HttpStatus.OK;

        return new ResponseEntity<Object>(res, status);
    }
}
