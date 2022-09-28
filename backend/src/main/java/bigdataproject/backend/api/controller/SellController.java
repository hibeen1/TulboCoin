package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.SellReq;
import bigdataproject.backend.api.response.SellRes;
import bigdataproject.backend.api.service.SellService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sell")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
public class SellController {

    private final SellService sellService;

    @PostMapping()
    @ApiOperation(value = "매도", notes = "매도 기록 저장 및 지갑 수정")
    public ResponseEntity<SellRes> postSell(@RequestBody SellReq sellReq){
        HttpStatus status;
        SellRes sellRes = sellService.postSellRecord(sellReq);
        if (sellRes == null){
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(null, status);
        }
        status = HttpStatus.OK;
        return new ResponseEntity<SellRes>(sellRes, status);
    }
}
