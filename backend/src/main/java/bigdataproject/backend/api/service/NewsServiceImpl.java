package bigdataproject.backend.api.service;

import bigdataproject.backend.common.util.Variable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class NewsServiceImpl implements NewsService{

    @Override
    public Object conveyNews(String query) {
        Object result = getNews(query);
        log.info(result.getClass().toString());
        return result;
    }

    public Object getNews(String query){
        Object mono = WebClient.builder()
                .baseUrl("https://openapi.naver.com/v1/search/news.json?query=" + query + "&display=20&sort=date")
                .defaultHeader(Variable.naverApiIdHeader, Variable.naverApiIdValue)
                .defaultHeader(Variable.naverApiSecretHeader, Variable.naverApiSecretValue)
                .build()
                .get()
                .retrieve()
                .bodyToMono(Object.class)
                .block();
        return mono;
    }
}
