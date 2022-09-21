package bigdataproject.backend.service;

import bigdataproject.backend.model.User;

import java.util.List;

public interface UserService {
    public User createUser(User user);
    public User getUserByUserId(String userId);
    public List<User> getAllUsers();
    public User updateUser(User user, String userId);
    public void deleteUser(String userId);

    Boolean checkIdDuplicated(String userId);


}
