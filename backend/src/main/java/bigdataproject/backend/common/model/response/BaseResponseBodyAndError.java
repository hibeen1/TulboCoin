package bigdataproject.backend.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@ApiModel("BaseResponseBodyAndError")
public class BaseResponseBodyAndError {
    @ApiModelProperty(name="응답 메시지", example = "정상")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "200")
    Integer statusCode = null;
    @ApiModelProperty(name="data", example = "{property1: value1, property2: value2}")
    Object data = null;

    public BaseResponseBodyAndError() {}

    public BaseResponseBodyAndError(Integer statusCode){
        this.statusCode = statusCode;
    }

    public BaseResponseBodyAndError(Integer statusCode, String message, Object data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public static BaseResponseBodyAndError of(Integer statusCode, String message, Object data) {
        BaseResponseBodyAndError body = new BaseResponseBodyAndError();
        body.message = message;
        body.statusCode = statusCode;
        body.data = data;
        return body;
    }
}











