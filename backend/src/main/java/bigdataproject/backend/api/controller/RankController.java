package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.response.RankRes;
import bigdataproject.backend.api.service.RankService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("rank")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
public class RankController {

    private final RankService rankService;

    @GetMapping()
    @ApiOperation(value = "랭킹 조회", notes = "")
    public ResponseEntity<List<RankRes>> getRank(){
        HttpStatus status;
        /**
         * 모든 유저를 불러오고
         * api 요청 보내고 -> https://api.upbit.com/v1/market/all로 모든 티커를 가져오고 그중 KRW-로 시작하는 티커만 가져온 다음
         *               -> 그 티커들을 https://api.upbit.com/v1/ticker?markets= 에 티커값들을 , 단위로 끊어서 보내주면 해당 코인들에 대한 정보를 가져옴
         * 유저의 지갑 불러오고
         * 지갑의 코인을 시세로 곱해서 유저의 balance에 저장하고
         * 기초 시드인 1천만원에서 수익률을 도출한다
         */

        List<RankRes> rankResList = rankService.getRankList();
        rankResList.sort(Comparator.comparingDouble(RankRes::getPercent).reversed());
        status = HttpStatus.OK;

        return new ResponseEntity<List<RankRes>>(rankResList, status);
    }
}
