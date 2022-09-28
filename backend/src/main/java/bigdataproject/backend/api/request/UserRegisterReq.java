package bigdataproject.backend.api.request;



import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserRegisterReq {

    @Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "아이디는 숫자, 영어, 한글만 가능합니다.")
    @Size(min = 2, max = 10)
    String userId;

    @NotNull(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이 아닙니다.")
    @Size(min = 3, max = 50)
    String email;

    @NotNull(message = "비밀번호는 필수입니다")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,15}$",
            message = "비밀번호는 영문, 숫자, 특수문자가 적어도 1개 이상씩 포함된 8자 ~ 15자의 비밀번호여야 합니다.")
    String password;

    long balance;
    String imagePath;
}
