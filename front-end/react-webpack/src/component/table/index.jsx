import React from "react"
import {connect} from "react-redux"
import BaseComponent from "../../common/BaseComponent"
import "./index.less"
import {Table} from "antd"

class DataTable extends BaseComponent {

    constructor(props) {
        super(props)
        const columns = props.columns ? props.columns : []
        const sortedInfo = {}
        columns.map(function (row) {
            if (row.key !== 'action') {
                row.sorter = (a, b) => {
                }
                row.sortOrder = sortedInfo.columnKey === row.key && sortedInfo.order
            }
        })
        if (props.deleteUrl) {
            const deleteAction = {
                title: 'Action',
                dataIndex: '', key: 'x',
                render: (text, record, index) => {
                    this.state.rows.slice(index, 1)
                    return <a href="javascript:" onClick={() => {
                        this.deleteRows(record.key)
                        const rows = this.state.rows.slice(0)
                        rows.splice(index, 1)
                        this.setState({
                            rows: rows
                        })
                    }}>Delete</a>
                }
            }
            columns.push(deleteAction)
        }
        this.state = {
            sortedInfo: sortedInfo,
            pageNo: 1,
            pageSize: 10,
            scroll: props.scroll ? props.scroll : {},
            columns: columns
        }

        if (props.pageAction) {
            props.getPage(props.pageAction.type, {
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize
            }, props.pageAction.url)
        }

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

    deleteRows = (rowIds) => {

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
        this.props.getPage(this.props.pageAction.type, {
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            field: sorter.field,
            order: sorter.order ? (sorter.order === 'ascend' ? 'ASC' : 'DESC') : sorter.order
        }, this.props.pageAction.url)
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
        return (
            <div>
                <div className="table-operations">
                </div>
                <Table columns={this.state.columns}
                       dataSource={this.state.rows}
                       onChange={this.handleChange}
                       rowSelection={this.rowSelection}
                       scroll={this.state.scroll}
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
    (state, props) => {
        if (props.reducer) {
            const page = state.getIn(props.reducer)
            return {
                page
            }
        }
        return {}
    },
    (dispatch) => {
        return {
            getPage: (type, params, url) => {
                dispatch({
                    type: type,
                    value: params,
                    url: url
                })
            }
        }
    }
)(DataTable)