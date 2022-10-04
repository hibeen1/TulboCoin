package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.SellReq;
import bigdataproject.backend.api.response.BuyRecordRes;
import bigdataproject.backend.api.response.SellRecordRes;
import bigdataproject.backend.api.response.SellRes;
import bigdataproject.backend.api.service.SellService;
import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.common.auth.TulUserDetails;
import bigdataproject.backend.common.model.response.BaseResponseBody;
import bigdataproject.backend.db.entity.Sell;
import bigdataproject.backend.db.entity.User;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sell")
@CrossOrigin
@Slf4j
@RequiredArgsConstructor
public class SellController {

    private final SellService sellService;

    private final UserService userService;

    @PostMapping()
    @ApiOperation(value = "매도", notes = "매도 기록 저장 및 지갑 수정")
    public ResponseEntity<?> postSell(Authentication authentication, @RequestBody SellReq sellReq){
        HttpStatus status;

        if (authentication == null){
            status = HttpStatus.UNAUTHORIZED;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(401, "토큰 없거나 만료되었습니다"), status);
        }

        TulUserDetails userDetails = (TulUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        SellRes sellRes = sellService.postSellRecord(user, sellReq);

        if (sellRes == null){
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(400, "보유하지 않은 코인이거나 판매 개수보다 적은 코인을 가지고 있습니다"), status);
        }
        status = HttpStatus.OK;
        return new ResponseEntity<SellRes>(sellRes, status);
    }

    @GetMapping()
    @ApiOperation(value = "매도 기록", notes = "매도 기록 불러오기")
    public ResponseEntity<?> getSellRecord(Authentication authentication){
        HttpStatus status;
        if (authentication == null){
            status = HttpStatus.UNAUTHORIZED;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(401, "토큰 없거나 만료되었습니다"), status);
        }

        TulUserDetails userDetails = (TulUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if (user == null){
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(404, "없는 유저입니다"), status);
        }
        List<SellRecordRes> sellRecordResList = sellService.getSellRecord(user);

        status = HttpStatus.OK;

        return new ResponseEntity<List<SellRecordRes>>(sellRecordResList, status);
    }
}
