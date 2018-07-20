var table = {
    initTable: function (tableUri, columnList, url, queryParams, height) {
        $("#" + tableUri).bootstrapTable({
            method: 'post',
            url: url,
            height: height,
            undefinedText: '-',
            pagination: true, // 分页
            striped: true, // 是否显示行间隔色
            queryParams: queryParams,
            cache: false, // 是否使用缓存
            pageList: [5, 10, 20, 50],
            toolbar: "#toolbar",// 指定工具栏
            showColumns: true, // 显示隐藏列
            showRefresh: true, // 显示刷新按钮
            uniqueId: "userName", // 每一行的唯一标识
            sidePagination: "server", // 服务端处理分页
            columns: columnList,
            responseHandler: function (res) {
                return {
                    total: res.total,
                    rows: res.rows
                };
            }
        })
    }
}