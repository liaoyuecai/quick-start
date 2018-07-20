package org.quick.universal;

import lombok.Data;

/**
 * 应答消息
 */
@Data
public class ResponseMsg {
    public final static int SUCCESS = 0;
    public final static int ERROR = 1;
    public final static int PARAMS_EXCEPTION = 2;
    public final static int SYS_EXCEPTION = 3;
    int code;
    Object message;

    public ResponseMsg(int code, Object message) {
        this.code = code;
        this.message = message;
    }

    public ResponseMsg(int code) {
        this.code = code;
    }

    public static ResponseMsg success(Object message) {
        ResponseMsg msg = new ResponseMsg(SUCCESS, message);
        return msg;
    }

    public static ResponseMsg success() {
        ResponseMsg msg = new ResponseMsg(SUCCESS);
        return msg;
    }

    public static ResponseMsg error(Object message) {
        ResponseMsg msg = new ResponseMsg(ERROR);
        return msg;
    }
}
