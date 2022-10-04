package bigdataproject.backend.api.service;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class SparkServiceImpl implements SparkService {

    @Autowired
    JavaSparkContext sc;

    @Override
    public Map<String, Long> getCount(LocalDateTime ldt, LocalDateTime now, int cnt) {
        Map<String, Long> wordCounts = new HashMap<>();
        JavaRDD<String> coinMap = null;
        int testCnt = 0;
        while (true) {
            cnt -= 1;

            if (cnt < 0) {
                System.out.println("finished");
                System.out.println("비교" + ldt);
                System.out.println("현재" + now);
                wordCounts = coinMap.countByValue();
                System.out.println("너 얼마나 돌았니??  " + testCnt);
                return wordCounts;
            }
            testCnt += 1;

            String year = String.valueOf(ldt.getYear());
            String month = String.format("%02d", ldt.getMonth().getValue());
            String day = String.format("%02d", ldt.getDayOfMonth());
            String hour = String.format("%02d", ldt.getHour());
            String minute = String.valueOf(ldt.getMinute() - (ldt.getMinute() % 10));


            System.out.println("=============================================================================================");
            System.out.println(ldt);
            ldt = ldt.plusMinutes(10);
            System.out.println(ldt);
            System.out.println("=============================================================================================");

            StringBuilder sb = new StringBuilder();
            String pwd = "/home/ubuntu/COININFO/";
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
//            filePath = "src/main/resources/40.csv";


            JavaRDD<String> testFile = sc.textFile(filePath);
            JavaRDD<String [] > testSplit = testFile.map(s -> s.split(","));
            if (coinMap == null) {
                coinMap = testSplit.map(s -> s[1]);
                continue;
            }
            coinMap.union(testSplit.map(s -> s[1]));
//            JavaRDD<Double> testMap = testSplit.map(s -> Double.parseDouble(s[6])*Double.parseDouble(s[7]));


        }
    }
}
