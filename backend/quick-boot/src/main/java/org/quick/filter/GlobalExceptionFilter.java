package org.quick.filter;

import org.quick.universal.ResponseMsg;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Exception全局拦截
 */
@ControllerAdvice
public class GlobalExceptionFilter {

    @ResponseBody
    @ExceptionHandler
    public ResponseMsg processException(Exception e) {
        String msg = "系统异常:" + e.getMessage() + "，请联系管理员";
        return new ResponseMsg(ResponseMsg.SYS_EXCEPTION, msg);
    }
}
