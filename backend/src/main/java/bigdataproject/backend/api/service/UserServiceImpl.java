package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.api.request.UserUpdateReq;
import bigdataproject.backend.api.response.LikeCoinRes;
import bigdataproject.backend.db.entity.LikeCoin;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    SellRepository sellRepository;

    @Autowired
    BuyRepository buyRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    LikeCoinRepository likeCoinRepository;



    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User createUser(UserRegisterReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setBalance(userRegisterInfo.getBalance());
        user.setImagePath(userRegisterInfo.getImagePath());
        user.setEmail(userRegisterInfo.getEmail());
        user.setInvestStartTime(LocalDateTime.now());
        userRepository.save(user);

        return user;
    }

    @Override
    public User getUserByUserSeq(Long userSeq) {
        User user = userRepository.findById(userSeq).get();
        return user;
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User getUserByUserId(String userId) {
        Optional<User> user = userRepositorySupport.findUserByUserId(userId);

        if(!user.isPresent()) {
            return null;}
        return user.get();
    }

    @Override
    public User updateUserInfo(String userId, UserUpdateReq updateInfo) {
        Optional<User> updatedUser = userRepositorySupport.findUserByUserId(userId);
        if (updatedUser.isPresent()) {
            updatedUser.get().setBalance(updateInfo.getBalance());
            updatedUser.get().setImagePath(updateInfo.getImagePath());
            updatedUser.get().setEmail(updateInfo.getEmail());
        }
        userRepository.save(updatedUser.get());
        return updatedUser.get();
    }

    @Override
    public Boolean checkIdDuplicated(String userId) {
        if (userRepository.countByUserId(userId) == 0) {
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public User reset(User user) {
        walletRepository.deleteAllByUser(user);
        buyRepository.deleteAllByUser(user);
        sellRepository.deleteAllByUser(user);
        user.setInvestStartTime(LocalDateTime.now());
        user.setBalance(10000000);
        userRepository.save(user);
        return user;
    }
}

