package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.api.response.UserInfoRes;
import bigdataproject.backend.api.response.UserRes;
import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.common.auth.TulUserDetails;
import bigdataproject.backend.common.model.response.BaseResponseBody;
import bigdataproject.backend.common.model.response.BaseResponseBodyAndError;
import bigdataproject.backend.db.entity.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("users")
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;

//    전체 user 정보 조회
    @GetMapping()
    @ApiOperation(value = "유저 조회", notes = "현재 가입된 모든 유저 조회.")
    public List<UserRes> selectAllUsers() {

        List<User> userList = userService.getAllUsers();

        List<UserRes> userResList = new ArrayList<>();

        for (User user : userList){
            UserRes res = UserRes.of(user);
            userResList.add(res);
        }
        return userResList;
    }


//회원가입(user create)
    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입")
    public ResponseEntity<?> createUser(@Validated @RequestBody UserRegisterReq userRegisterInfo, BindingResult bindingResult) {

//        유효성 검사
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
            return ResponseEntity.status(401).body(BaseResponseBodyAndError.of(401, "Invalid", errors));
        }
//        아이디 중복 검사
        String userId = userRegisterInfo.getUserId();
        if (!userService.checkIdDuplicated(userId)) {
            return ResponseEntity.status(400).body(UserInfoRes.of(400, "이미 가입된 아이디입니다.", null));
        }
        User user = userService.createUser(userRegisterInfo);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
// userSeq로 user의 정보 read
    @GetMapping("info/seq/{userSeq}")
    @ApiOperation(value = "userSeq로 회원 조회", notes = "userSeq로 회원 조회하고 해당 유저 정보 반환")
    public ResponseEntity<User> getUserInfo(@PathVariable Long userSeq) {
        User user = userService.getUserByUserSeq(userSeq);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("info/id/{userId}")
    @ApiOperation(value = "userId로 회원 조회", notes = "userId로 회원 조회하고 해당 유저 정보 반환")
    public ResponseEntity<?> getUserInfoById(@PathVariable String userId) {
        User user = userService.getUserByUserId(userId);

        if (user == null){
            return new ResponseEntity<>("해당 user가 존재하지 않습니다", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("check/{userId}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiOperation(value = "아이디 중복 체크", notes = "중복이면 false, 유효하면 true")
    public ResponseEntity<Boolean> checkId(@PathVariable("userId") String userId) {
        return new ResponseEntity<Boolean>(userService.checkIdDuplicated(userId), HttpStatus.OK);

    }

    @PostMapping("reset")
    @ApiOperation(value = "유저 투자 초기화", notes = "투자시간, 지갑, 거래기록 초기화")
    public ResponseEntity<?> reset(Authentication authentication){
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

        User renew_user = userService.reset(user);
        UserRes res = UserRes.of(renew_user);
        status = HttpStatus.OK;
        return new ResponseEntity<UserRes>(res, status);
    }

//    회원 삭제
//    @DeleteMapping("info/{userSeq}")
//    @ApiOperation(value = "해당 userSeq 가진 유저 삭제", notes = "해당 userSeq 유저 삭제")
//    public ResponseEntity<?> deleteUser(@PathVariable Long userSeq){
//        User user = userService.getUserByUserSeq(userSeq);
//        userService.deleteUser(user);
//        return new ResponseEntity<>(userSeq + "번 회원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
//    }


}
