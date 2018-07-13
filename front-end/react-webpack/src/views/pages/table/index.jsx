import React from 'react'
import BaseComponent from '../../../common/BaseComponent'
import './index.less'


class Table extends BaseComponent {

    state = {
        filteredInfo: null,
        sortedInfo: null,
        tableParams: {
            pageNo: 1,
            pageSize: 10
        },
        data: null,
        total: 0,
        pageSize: 10,
    }

    handleChange = (pagination, filters, sorter) => {
        const tableParams = this.state.tableParams
        if (pagination) {
            tableParams.pageNo = pagination.current
            tableParams.pageSize = pagination.pageSize
        }
        if (sorter) {
            tableParams.field = sorter.field
            tableParams.order = sorter.order
        }
        this.props.getTableData(this.state.tableParams)
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
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

}

export default Table