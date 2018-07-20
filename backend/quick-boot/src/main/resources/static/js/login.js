$(function () {
    $().ready(function () {
        $("#loginForm").validate({
            onsubmit: true,// 是否在提交是验证
            onfocusout: false,// 是否在获取焦点时验证
            onkeyup: false,// 是否在敲击键盘时验证

            rules: {
                userName: "required",
                password: {
                    required: true,
                    minlength: 6
                },
            },
            messages: {
                userName: "请输入用户名",
                password: {
                    required: "请输入密码",
                    minlength: "密码长度不能小于 6 个字母"
                },
            },
            submitHandler: function (form) { //通过之后回调
                $("#loginForm").ajaxSubmit(function (data) {
                    console.log(data)
                    // data = JSON.parse(data);
                    // if (data.success) {
                    //     layer.msg(data.message, {icon: 1}, function () {
                    //         window.location.href = "./index";
                    //     });
                    // } else {
                    //     layer.msg(data.message, {icon: 2});
                    // }
                });
            },
            invalidHandler: function (form, validator) {
                return false;
            }
        });
    });
})
