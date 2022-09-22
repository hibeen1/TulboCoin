package bigdataproject.backend.api.controller;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.db.entity.User;
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

    @GetMapping()
    public List<User> selectAllUsers() {
        return userService.getAllUsers();
    }


    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody UserRegisterReq userRegisterInfo) {
        User user = userService.createUser(userRegisterInfo);

        return new ResponseEntity<User>(user, HttpStatus.OK);

    }


}
