import React from 'react'
import BaseComponent from '../../../common/BaseComponent'
import {connect} from "react-redux"
import {Table, Button} from 'antd'
import './index.less'


export default class Screen extends BaseComponent {
    constructor(props) {
        super(props)
    }

    onLoadQR =(text,e) =>{
        console.log("111")
        console.log(text)
    }

    state = {
        filteredInfo: null,
        sortedInfo: null,
        tableParams: {
            pageNo: 1,
            pageSize: 10,
            filters: this.props.filters
        }
    }
    // handleChange = (pagination, filters, sorter) => {
    //     const tableParams = this.state.tableParams
    //     if (pagination) {
    //         tableParams.pageNo = pagination.current
    //         tableParams.pageSize = pagination.pageSize
    //     }
    //     if (sorter) {
    //         tableParams.field = sorter.field
    //         tableParams.order = sorter.order
    //     }
    //     // this.props.getTableData(this.props.actionType, this.state.tableParams)
    //     this.setState({
    //         filteredInfo: filters,
    //         sortedInfo: sorter,
    //     })
    // }

    render() {
        let {sortedInfo, filteredInfo} = this.state
        sortedInfo = sortedInfo || {}
        filteredInfo = filteredInfo || {}
        this.props.columns.map(function (row) {
            row.sorter = (a, b) => {
            }
            row.sortOrder = sortedInfo.columnKey === row.key && sortedInfo.order
        })

        return (

            <Table
                columns={this.props.columns} //th菜单项
                dataSource={this.props.data} //数据
                onChange={this.props.handleChange}
                rowSelection={this.props.rowSelection}
                scroll={this.props.scroll}
                pagination={{  //分页
                    total: this.props.total, //数据总数量
                    pageSize: this.props.pageSize,  //显示几条一页
                    defaultPageSize: this.props.defaultPageSize, //默认显示几条一页
                    showSizeChanger: true,  //是否显示可以设置几条一页的选项
                    showTotal: function () {  //设置显示一共几条数据
                        return '共 ' + this.total + '条数据'
                    }
                }}
            />

        )
    }
}