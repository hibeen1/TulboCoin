package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.api.service.WalletService;
import bigdataproject.backend.common.auth.TulUserDetails;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import bigdataproject.backend.api.response.WalletRes;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("wallet")
@CrossOrigin
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    private final UserService userService;

    @GetMapping()
    @ApiOperation(value = "보유 코인 정보 조회", notes = "해당 유저의 보유 코인 정보를 리스트 형태로 응답함")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공, 보유한 코인이 없다면 []"),
            @ApiResponse(code = 404, message = "없는 유저 번호"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<WalletRes>> getWallet(Authentication authentication){
        HttpStatus status;

        if (authentication == null){
            status = HttpStatus.UNAUTHORIZED;
            return new ResponseEntity<>(null, status);
        }

        TulUserDetails userDetails = (TulUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if (user == null){
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(null, status);
        }

        List<Wallet> walletList = walletService.getAllWallets(user.getUserSeq());
        if (walletList == null){
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<>(null, status);
        }
        List<WalletRes> res = new ArrayList<>();
        for(Wallet wallet : walletList){
            WalletRes walletRes = WalletRes.of(wallet);
            res.add(walletRes);
        }
        status = HttpStatus.OK;
        return new ResponseEntity<List<WalletRes>>(res, status);
    }
}
