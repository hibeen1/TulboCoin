package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.db.entity.User;
import io.swagger.annotations.ApiOperation;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

//    전체 user 정보 조회
    @GetMapping()
    @ApiOperation(value = "유저 조회", notes = "현재 가입된 모든 유저 조회.")
    public List<User> selectAllUsers() {
        return userService.getAllUsers();
    }


//회원가입(user create)
    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입")
    public ResponseEntity<User> createUser(@RequestBody UserRegisterReq userRegisterInfo) {
        User user = userService.createUser(userRegisterInfo);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
// userSeq로 user의 정보 read
    @GetMapping("my-info/{userSeq}")
    @ApiOperation(value = "userSeq로 회원 조회", notes = "userSeq로 회원 조회하고 해당 유저 정보 반환")
    public ResponseEntity<User> getUserInfo(@PathVariable Long userSeq) {
        User user = userService.getUserByUserSeq(userSeq);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

//    회원 삭제
    @DeleteMapping("my-info/{userSeq}")
    @ApiOperation(value = "해당 userSeq 가진 유저 삭제", notes = "해당 userSeq 유저 삭제")
    public ResponseEntity<?> deleteUser(@PathVariable Long userSeq){
        User user = userService.getUserByUserSeq(userSeq);
        userService.deleteUser(user);
        return new ResponseEntity<>(userSeq + "번 회원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
    }

//    @PutMapping
//
    }
