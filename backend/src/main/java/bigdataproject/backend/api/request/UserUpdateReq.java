package bigdataproject.backend.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserUpdateReq {
    String userId;

    @NotNull(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이 아닙니다.")
    @Size(min = 3, max = 50)
    String email;
    long balance;
    String imagePath;
}
