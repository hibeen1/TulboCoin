package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;



    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public User createUser(UserRegisterReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        user.setPassword(userRegisterInfo.getPassword());
        user.setBalance(userRegisterInfo.getBalance());
        user.setImagePath(userRegisterInfo.getImagePath());
        user.setEmail(userRegisterInfo.getEmail());
        userRepository.save(user);

        return user;
    }
}
