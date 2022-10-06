package bigdataproject.backend.api.service;

import bigdataproject.backend.db.WebClient.WordCountDTO;
import bigdataproject.backend.db.repository.CoinRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class SparkServiceImpl implements SparkService {

    private final JavaSparkContext sc;

    private final CoinRepository coinRepository;

    @Override
    public List<WordCountDTO> getCount(LocalDateTime ldt, LocalDateTime now, int cnt) {
        Map<String, Long> wordCounts = new HashMap<>();
        Map<String, Long> coinNameCounts = new HashMap<>();
        JavaRDD<String> coinMap = null;
        String pwd = "/home/ubuntu/COININFO/";
        int testCnt = 0;
        while (true) {
            cnt -= 1;
            if (cnt < 0) {
                wordCounts = coinMap.countByValue();
                List<WordCountDTO> countDTOList = new ArrayList<>();

                System.out.println("너 얼마나 돌았니??  " + testCnt);
                for (Map.Entry<String, Long> entry : wordCounts.entrySet()){
                    try {
                        WordCountDTO wordCountDTO = new WordCountDTO();
                        wordCountDTO.setValue(coinRepository.findCoinByCoinCode(entry.getKey()).getCoinName());
                        wordCountDTO.setCount(entry.getValue());
                        countDTOList.add(wordCountDTO);
                    } catch (NullPointerException nullPointerException){
                        log.info("Coin 테이블에 존재하지않는 코인이 워드 카운트에 존재함");
                    }
                }
                log.info(countDTOList.toString());
                return countDTOList;
            }
            testCnt += 1;

            String year = String.valueOf(ldt.getYear());
            String month = String.format("%02d", ldt.getMonth().getValue());
            String day = String.format("%02d", ldt.getDayOfMonth());
            String hour = String.format("%02d", ldt.getHour());
            String minute = String.valueOf(ldt.getMinute() - (ldt.getMinute() % 10));

            ldt = ldt.plusMinutes(10);

            StringBuilder sb = new StringBuilder();
            sb.append(pwd);
            sb.append(year);
            sb.append("/");
            sb.append(month);
            sb.append("/");
            sb.append(day);
            sb.append("/");
            sb.append(hour);
            sb.append("/");
            sb.append(minute);
            sb.append(".csv");
            String filePath = sb.toString();
            System.out.println(filePath);
//            String filePath = "src/main/resources/40.csv";



            try {
                JavaRDD<String> testFile = sc.textFile(filePath);
                JavaRDD<String [] > testSplit = testFile.map(s -> s.split(","));
                if (coinMap == null) {
                    coinMap = testSplit.map(s -> s[1]);
                    continue;
                }
                coinMap = coinMap.union(testSplit.map(s -> s[1]));
//            JavaRDD<Double> testMap = testSplit.map(s -> Double.parseDouble(s[6])*Double.parseDouble(s[7]));
            } catch (Exception e) {
                return  null;
            }
        }
    }
}
