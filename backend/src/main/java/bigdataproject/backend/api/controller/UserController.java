package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.db.entity.User;
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
    public List<User> selectAllUsers() {
        return userService.getAllUsers();
    }


//회원가입(user create)
    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody UserRegisterReq userRegisterInfo) {
        User user = userService.createUser(userRegisterInfo);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
// userSeq로 user의 정보 read
    @GetMapping("my-info/{userSeq}")
    public ResponseEntity<User> getUserInfo(@PathVariable Long userSeq) {
        User user = userService.getUserByUserSeq(userSeq);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

//    회원 삭제
    @DeleteMapping("my-info/{userSeq}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userSeq){
        User user = userService.getUserByUserSeq(userSeq);
        userService.deleteUser(user);
        return new ResponseEntity<>(userSeq + "번 회원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
    }

    @PutMapping

    }
