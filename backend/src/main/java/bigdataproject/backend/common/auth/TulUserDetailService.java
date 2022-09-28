package bigdataproject.backend.common.auth;

import bigdataproject.backend.api.service.UserService;
import bigdataproject.backend.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

//유저를 불러와서 UserDetails 로 리턴해주는 service
@Component
public class TulUserDetailService implements UserDetailsService {
    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userService.getUserByUserId(userId);
        if(user != null) {
            UserDetails userDetails = new TulUserDetails(user);
            return userDetails;
        }
        return null;
    }
}
