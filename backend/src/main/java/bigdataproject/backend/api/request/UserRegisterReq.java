package bigdataproject.backend.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterReq {

    String userId;
    String email;
    String password;
    long balance;
    String imagePath;
}
