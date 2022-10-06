package bigdataproject.backend.api.service;

import bigdataproject.backend.api.response.RankRes;
import bigdataproject.backend.api.response.UserRes;
import bigdataproject.backend.api.response.WalletRes;
import bigdataproject.backend.common.util.Variable;
import bigdataproject.backend.db.WebClient.RealCoinDTO;
import bigdataproject.backend.db.entity.Coin;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import bigdataproject.backend.db.repository.CoinRepository;
import bigdataproject.backend.db.repository.UserRepository;
import bigdataproject.backend.db.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class RankServiceImpl implements RankService{

    private final UserRepository userRepository;

    private final WalletRepository walletRepository;

    private final CoinRepository coinRepository;

    @Override
    @Transactional
    public List<RankRes> getRankList() {

        //KRW로 시작하는 TICKER 가져오기
        List<String> tickerList = new ArrayList<>();
        for (Object temp : getTicker()){
            if (temp.toString().substring(8, 11).equals("KRW")){
                String[] values = temp.toString().split(",");
                String ticker = values[0].substring(8,values[0].length());

                /**여기는 코인 정보 이름, 티커 저장하기 위해서 씀
                String korName = values[1].substring(13, values[1].length());
                Coin coin = coinRepository.findByCoinName(korName);
                if (coin == null){
                    Coin newCoin = Coin.builder()
                            .coinName(korName)
                            .coinCode(ticker)
                            .build();
                    coinRepository.save(newCoin);
                }*/

                tickerList.add(ticker);
            }
        }
        String sendTicker = tickerList.toString().substring(1,tickerList.toString().length()-1);

        //코인 시세 가져오기
        List<RealCoinDTO> coinPriceList = getCoinList(sendTicker);


        HashMap<String, Double> priceTable = new HashMap<String, Double>();
        for (RealCoinDTO realCoinDTO : coinPriceList){
            priceTable.put(realCoinDTO.getMarket(), realCoinDTO.getTrade_price());
        }
        //유저 모두 불러오기
        List<User> users = userRepository.findAll();

        List<RankRes> rankResList = new ArrayList<>();

        for (User user : users){
            //유저를 바탕으로 지갑 불러오기
            List<Wallet> walletList = walletRepository.findAllByUser(user);
            List<WalletRes> walletResList = new ArrayList<>();
            double newBalance = 0;
            double percent = 0;
            for (Wallet wallet : walletList){
                WalletRes walletRes = WalletRes.of(wallet);
                walletResList.add(walletRes);
                //지갑의 코인을 시세와 비교해서 유저의 balance에 더해주기
                newBalance += wallet.getCoinAmount()*priceTable.get(wallet.getCoinCode());
            }
            newBalance += user.getBalance();
            //시작 시드머니인 천만원과 비교해서 수익률 계산하기
            percent = ((newBalance-Variable.seedMoney)/Variable.seedMoney)*100;

            RankRes rankRes = new RankRes();
            rankRes.setUser(UserRes.of(user));
            rankRes.setWalletList(walletResList);
            rankRes.setExpectedBalance(newBalance);
            rankRes.setPercent(percent);

            rankResList.add(rankRes);
        }

        return rankResList;
    }


    public static ArrayList getTicker(){
        Mono<ArrayList> mono = WebClient.builder()
                .baseUrl("https://api.upbit.com/v1/market/all")
                .build()
                .get()
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(ArrayList.class));
        return mono.block();
    }

    public List<RealCoinDTO> getCoinList(String tickers){
        RealCoinDTO[] res = WebClient.builder()
                .baseUrl("https://api.upbit.com/v1/ticker?markets="+tickers)
                .build()
                .get()
                .retrieve()
                .bodyToMono(RealCoinDTO[].class)
                .block();
        List<RealCoinDTO> coinDTOList = Arrays.stream(res).collect(Collectors.toList());

        return coinDTOList;
    }

}
