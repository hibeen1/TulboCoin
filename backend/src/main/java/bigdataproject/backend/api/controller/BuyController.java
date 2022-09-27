package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.BuyReq;
import bigdataproject.backend.api.response.BuyRes;
import bigdataproject.backend.api.service.BuyService;
import bigdataproject.backend.db.entity.User;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("buy")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class BuyController {

    private final BuyService buyService;


    @PostMapping()
    @ApiOperation(value = "매수", notes = "매수 기록 저장 및 지갑 정보 수정")
    public ResponseEntity<BuyRes> postBuy(@RequestBody BuyReq buyReq){
        log.info("postBuy 호출");
        log.info(buyReq.getBuyCoinName() + "controller에서 buyReq의 코인이름");
        HttpStatus status;
        BuyRes buyRes = buyService.postBuyRecord(buyReq);
        if (buyRes == null){
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(null, status);
        }
        status = HttpStatus.OK;
        return new ResponseEntity<BuyRes>(buyRes, status);
    }

}
