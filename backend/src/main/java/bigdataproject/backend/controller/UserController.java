package bigdataproject.backend.controller;

import bigdataproject.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;
}
