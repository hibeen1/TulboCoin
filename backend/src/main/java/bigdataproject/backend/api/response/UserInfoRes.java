package bigdataproject.backend.api.response;

import bigdataproject.backend.common.model.response.BaseResponseBody;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserInfoRes extends BaseResponseBody {

    UserRes user;


    public static UserInfoRes of(Integer status, String message, UserRes userRes){
        UserInfoRes res = new UserInfoRes();
        res.setStatusCode(status);
        res.setMessage(message);
        res.setUser(userRes);

        return res;
    }
}
