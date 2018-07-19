var index = {
    initTable: function () {
        var columnList = [{
            title: '操作',
            field: 'id',
            align: 'center',
            formatter: function (value, row, index) {
                var e = '<a href="#" mce_href="#" onclick="index.editClient(\'' + row.id + '\')">修改</a> ';
                var d = '<a href="#" mce_href="#" onclick="index.deleteDevice(\'' + row.id + '\')">删除</a> ';
                var a = '<a href="#" mce_href="#" onclick="index.register(\'' + row.id + '\')">配置</a> ';
                return e + d + a;
            }
        }, {
            title: '终端名称',
            field: 'deviceName',
            align: 'center',
            formatter: function (value, row, index) {
                return '<a href="./client/device?deviceId=' + row.id + '" mce_href="#" >' + value + '</a> ';
            }
        }, {
            title: '终端类型',
            field: 'deviceType',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 1:
                        return "T808-2013";
                    default:
                        return "";
                }
            }
        }, {
            title: '备注',
            field: 'remark',
            align: 'center'
        }];
        table.initTable("deviceList", columnList, "./client/getClientList", function queryParams(pageReqeust) {
            pageReqeust.pageNo = this.offset;
            pageReqeust.pageSize = this.pageNumber;
            return pageReqeust;
        }, 800)
    },
    addClient: function () {
        index.layerIndex = layer.open({
            type: 1,
            area: ['500px', '380px'],
            title: '添加',
            content: '<div class="well" id="add_client_div"></div>'
        });
        $("div#add_client_div").load('./client/addClient');
    },
    layerIndex: 0,
    editClient: function (id) {
        index.layerIndex = layer.open({
            type: 1,
            area: ['500px', '380px'],
            title: '编辑',
            content: '<div class="well" id="edit_client_div"></div>'
        });
        $("div#edit_client_div").load('./client/editClient?id=' + id);
    },
    register: function (id) {
        index.layerIndex = layer.open({
            type: 1,
            area: ['500px', '700px'],
            title: '配置',
            content: '<div class="well" id="device_register_div"></div>'
        });
        $("div#device_register_div").load('./client/deviceRegister?id=' + id);
    },
    addDevice: function () {
        $("#saveDeviceForm").ajaxSubmit(function (data) {
            data = JSON.parse(data);
            if (data.success) {
                $("#deviceList").bootstrapTable("refresh");
                layer.close(index.layerIndex);
            }
        });
    },
    deleteDevice: function (deviceId) {
        $.ajax({
            type: 'POST',
            url: './client/deleteDevice',
            async: false,
            dataType: 'json',
            data: {
                "deviceId": deviceId
            },
            success: function (data) {
                if (data.success) {
                    layer.msg(data.message, {icon: 1}, function () {
                        $("#deviceList").bootstrapTable("refresh");
                    });
                } else {
                    layer.msg(data.message, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("未知错误！");
            }
        });
    },
    editDevice: function () {
        $("#editForm").ajaxSubmit(function (data) {
            data = JSON.parse(data);
            if (data.success) {
                $("#deviceList").bootstrapTable("refresh");
                layer.close(index.layerIndex);
            }
        });
    },
    saveRegister: function () {
        $("#registerForm").ajaxSubmit(function (data) {
            data = JSON.parse(data);
            if (data.success) {
                $("#deviceList").bootstrapTable("refresh");
                layer.close(index.layerIndex);
            }
        });
    }
}
$(function () {
    index.initTable();
})