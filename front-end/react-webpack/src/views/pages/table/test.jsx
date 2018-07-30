import React from "react";
import {connect} from "react-redux";
import BaseComponent from "../../../common/BaseComponent";
import "./index.less";
import {Table} from "antd";

class DataTable extends BaseComponent {

    constructor(props) {
        super(props)
        props.getPage({
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.page) {
            const page = nextProps.page
            this.setState({
                pageTotal: page.total,
                rows: page.list,
                pageSize: page.pageSize
            })
        }
    }

    state = {
        sortedInfo: null,
        pageNo: 1,
        pageSize: 10
    }

    handleChange = (pagination, filters, sorter) => {
        if (pagination) {
            this.setState({
                pageNo: pagination.current,
                pageSize: pagination.pageSize
            })
        }
        if (sorter) {
            this.setState({
                field: sorter.field,
                order: sorter.order
            })
        }
        this.props.getPage({
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            field: sorter.field,
            order: sorter.order
        })
        this.setState({
            sortedInfo: sorter
        })
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }

    render() {
        let {sortedInfo} = this.state
        sortedInfo = sortedInfo || {}
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
            key:'age'
        }, {
            title: 'Sex',
            dataIndex: 'sex',
            key:'sex',
            render: (text, record, index) => {
                return text == 0?'男':'女'
            }
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        }]
        columns.map(function (row) {
            if (row.key !== 'action') {
                row.sorter = (a, b) => {
                }
                row.sortOrder = sortedInfo.columnKey === row.key && sortedInfo.order
            }
        })
        return (
            <div>
                <div className="table-operations">
                </div>
                <Table columns={columns}
                       dataSource={this.state.rows}
                       onChange={this.handleChange}
                       rowSelection={this.rowSelection}
                       // scroll={{y: 400}}
                       pagination={{
                           total: this.state.pageTotal,
                           pageSize: this.state.pageSize,
                           defaultPageSize: this.state.pageSize,
                           showSizeChanger: true,
                           showTotal: function () {
                               return '共' + this.total + '条数据'
                           }
                       }}
                />
            </div>
        )
    }

}
export default connect(
    (state) => {
        const page = state.getIn(['tableReducers', 'studentsPage'])
        return {
            page
        }
    },
    (dispatch) => {
        return {
            getPage: (params) => {
                dispatch({
                    type: 'SELECT_STUDENT',
                    value: params,
                    url: 'http://localhost:7073/application/sample/student/studentPage'
                })
            }
        }
    }
)(DataTable)