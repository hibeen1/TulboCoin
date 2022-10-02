package bigdataproject.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {
    @ApiModelProperty(name="유저 ID", example="ssafy")
    String userId;
    @ApiModelProperty(name="유저 Password", example="ssafy123!")
    String password;
}
