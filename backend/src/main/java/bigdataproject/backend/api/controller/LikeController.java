package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.CoinReq;
import bigdataproject.backend.api.response.LikeCoinRes;
import bigdataproject.backend.api.service.LikeService;
import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.common.auth.TulUserDetails;
import bigdataproject.backend.common.model.response.BaseResponseBody;
import bigdataproject.backend.db.entity.LikeCoin;
import bigdataproject.backend.db.entity.User;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("likes")
@CrossOrigin
@RequiredArgsConstructor
public class LikeController {

    private final UserService userService;

    private final LikeService likeService;

    @GetMapping()
    @ApiOperation(value = "좋아요한 코인 목록", notes = "자신이 즐겨찾기에 등록한 코인들 이름 리스트")
    public ResponseEntity<?> getLikeCoinList(Authentication authentication) {
        HttpStatus status;

        if (authentication == null) {
            status = HttpStatus.UNAUTHORIZED;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(401, "토큰 없거나 만료되었습니다"), status);
        }

        TulUserDetails userDetails = (TulUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if (user == null) {
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(404, "없는 유저입니다"), status);
        }

        List<LikeCoinRes> res = likeService.getLikeCoinList(user);
        status = HttpStatus.OK;

        return new ResponseEntity<List<LikeCoinRes>>(res, status);
    }

    @PostMapping()
    @ApiOperation(value = "해당 코인을 좋아요 표시", notes = "해당 유저의 즐겨찾기에 해당 코인을 등록")
    public ResponseEntity<?> postLikeCoin(Authentication authentication, @RequestBody CoinReq coinReq){
        HttpStatus status;

        if (authentication == null) {
            status = HttpStatus.UNAUTHORIZED;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(401, "토큰 없거나 만료되었습니다"), status);
        }

        TulUserDetails userDetails = (TulUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if (user == null) {
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(404, "없는 유저입니다"), status);
        }

        LikeCoinRes res = likeService.postLikeCoin(user, coinReq);

        status = HttpStatus.OK;
        return new ResponseEntity<LikeCoinRes>(res, status);
    }

    @DeleteMapping()
    @ApiOperation(value = "좋아요한 코인 취소", notes = "해당 코인을 내 즐겨찾기에서 삭제함")
    public ResponseEntity<?> deleteLikeCoin(Authentication authentication, @RequestBody CoinReq coinReq){
        HttpStatus status;

        if (authentication == null) {
            status = HttpStatus.UNAUTHORIZED;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(401, "토큰 없거나 만료되었습니다"), status);
        }

        TulUserDetails userDetails = (TulUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if (user == null) {
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(404, "없는 유저입니다"), status);
        }

        Boolean isDelSuccess = likeService.deleteLikeCoin(user, coinReq);
        if (isDelSuccess == false){
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<BaseResponseBody>(BaseResponseBody.of(400, "즐겨찾기에 없는 코인입니다"), status);
        }

        status = HttpStatus.OK;
        return new ResponseEntity<>(null, status);
    }
}
