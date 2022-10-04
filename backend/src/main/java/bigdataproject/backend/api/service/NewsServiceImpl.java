package bigdataproject.backend.api.service;

import bigdataproject.backend.common.util.Variable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NewsServiceImpl implements NewsService{

    @Override
    public LinkedHashMap conveyNews(String query) {
        LinkedHashMap result = getNews(query);
        ArrayList x = (ArrayList) result.get("items");
        for (int i = 0; i < x.size(); i++){
            LinkedHashMap xx = (LinkedHashMap) x.get(i);
            String title = (String) xx.get("title");
            title = title.replaceAll("<b>", "");
            title = title.replaceAll("</b>", "");
            title = title.replaceAll("&apos;", "");
            title = title.replaceAll("&quot;", "'");
            String description = (String) xx.get("description");
            description = description.replaceAll("<b>", "");
            description = description.replaceAll("</b>", "");
            description = description.replaceAll("&apos;", "");
            description = description.replaceAll("&quot;", "'");
            xx.put("title", title);
            xx.put("description", description);
            x.set(i, xx);
        }

        result.put("items", x);

        return result;
    }

    public LinkedHashMap getNews(String query){
        LinkedHashMap mono = WebClient.builder()
                .baseUrl("https://openapi.naver.com/v1/search/news.json?query=" + query + "&display=20&sort=date")
                .defaultHeader(Variable.naverApiIdHeader, Variable.naverApiIdValue)
                .defaultHeader(Variable.naverApiSecretHeader, Variable.naverApiSecretValue)
                .build()
                .get()
                .retrieve()
                .bodyToMono(LinkedHashMap.class)
                .block();
        return mono;
    }
}
