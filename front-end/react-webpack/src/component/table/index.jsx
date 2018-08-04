import React from "react"
import BaseComponent from "../../common/BaseComponent"
import "./index.less"
import {Button, Table} from "antd"
import fetch from "../../common/utils/fetch"
import {info} from "../../common/utils/dialog"
import {IdToKey} from "../../common/utils/format"
import Modal from "../modal"
import QueryForm from "../form/query"
import TableForm from "../form/table"

export default class DataTable extends BaseComponent {

    params = {}
    btnTools = []

    constructor(props) {
        super(props)
        const columns = props.columns ? props.columns : []
        const sortedInfo = {}
        columns.map(function (row) {
            row.sorter = (a, b) => {
            }
            row.sortOrder = sortedInfo.columnKey === row.key && sortedInfo.order
        })
        let {pageUrl, insertUrl, editUrl, deleteUrl} = props.urls
        let {queryItems} = props
        if (editUrl || deleteUrl) {
            const action = {
                title: '操作',
                dataIndex: '', key: 'x',
                render: (text, record, index) => {
                    this.state.rows.slice(index, 1)
                    return <div>
                        {editUrl ? <a href="javascript:" onClick={() => this.edit(record)}>编辑</a> : ''}
                        {deleteUrl ? <a href="javascript:" onClick={() => this.delete(record.key)}>删除</a> : ''}
                    </div>
                }
            }
            columns.push(action)
        }
        if (insertUrl)
            this.btnTools.push(<Button key='editBtn' type="primary" onClick={() => this.add()}>添加</Button>)
        if (deleteUrl)
            this.btnTools.push(<Button key='delBtn' type="danger" onClick={() => this.batchDelete()}>删除</Button>)
        this.state = {
            sortedInfo: sortedInfo,
            pageSize: props.pageSize ? props.pageSize : 10,
            scroll: props.scroll ? props.scroll : {},
            columns: columns,
            pageUrl: pageUrl,
            insertUrl: insertUrl,
            editUrl: editUrl,
            deleteUrl: deleteUrl,
            queryForm: queryItems && queryItems.length ? <QueryForm
                items={this.props.queryItems}
                onSubmit={(values) => {
                    this.query(values)
                }}
            /> : null
        }
        this.params.pageNo = 1
        this.params.pageSize = this.state.pageSize
        this.pageList()
    }

    /**
     * 获取列表数据
     */
    pageList = () => {
        const data = fetch(this.state.pageUrl, this.params, 'POST')
        const _this = this
        data.then(data => {
            if (data && data.code === 0) {
                const page = data.message
                IdToKey(page.list)
                _this.setState({
                    pageTotal: page.total,
                    rows: page.list,
                    pageSize: page.pageSize
                })
            }
        })
    }

    delete = (rowIds) => {
        const data = fetch(this.state.deleteUrl, {ids: rowIds}, 'POST')
        data.then(data => {
            if (data && data.code === 0) {
                const ids = rowIds.split(',')
                const rows = this.state.rows.slice(0)
                const indexes = []
                rows.map(function (item, index) {
                    if (ids.includes(item.key)) {
                        indexes.push(index)
                    }
                })
                indexes.map(function (item) {
                    rows.splice(item, 1)
                })
                this.setState({
                    rows: rows
                })
            }
        })
    }

    setForm = (form) => {
        this.setState({
            form: form
        })
        if (form) {
            if (this.state.formValues) {
                const values = {}
                form.props.items.map((i) => {
                    values[i.key] = this.state.formValues[i.key]
                })
                values.id = this.state.formValues.key
                form.props.form.setFieldsValue(values)
            } else {
                const values = {}
                form.props.items.map((i) => {
                    values[i.key] = i.value
                })
                form.props.form.setFieldsValue(values)
            }
        }
    }

    batchDelete = () => {
        if (this.state.selectedRowKeys) {
            this.delete(this.state.selectedRowKeys)
        } else {
            info('请选择先勾选需要删除的数据')
        }
    }
    add = () => {
        console.log('aa')
        this.setState({
            modalContent: <TableForm
                items={this.props.formItems}
                onSubmit={(values) => {
                    this.query(values)
                }}
                wrappedComponentRef={(formRef) => {
                    this.setForm(formRef)
                }}
            />,
            modalVisible: true,
            formValues: null,
            formType: 'add',
            modalTitle: '新增'
        })
    }

    edit = (record) => {
        const item = this.props.formItems.slice(0)
        item.push({key: 'id'})
        this.setState({
            modalContent: <TableForm
                items={item}
                onSubmit={(values) => {
                    this.query(values)
                }}
                wrappedComponentRef={(formRef) => {
                    this.setForm(formRef)
                }}
            />,
            modalVisible: true,
            formValues: record,
            formType: 'edit',
            modalTitle: '编辑'
        })
    }

    submitForm = () => {
        this.state.form.props.form.validateFields((err, values) => {
            switch (this.state.formType) {
                case 'add':
                    this.submitAdd(values)
                    break
                case 'edit':
                    this.submitEdit(values)
                    break
            }

        })
    }
    submitAdd = (params) => {
        const data = fetch(this.state.insertUrl, params, 'POST')
        data.then(data => {
            if (data && data.code === 0) {
                const rows = this.state.rows.slice(0)
                params.key = data.message
                if (rows.length === this.state.pageSize)
                    rows.splice(rows.length - 1, 1)
                rows.splice(0, 0, params)
                this.setState({
                    rows: rows,
                    modalVisible: false
                })
            }
        })
    }

    submitEdit = (params) => {
        const data = fetch(this.state.editUrl, params, 'POST')
        data.then(data => {
            if (data && data.code === 0) {
                const rows = this.state.rows.slice(0)
                var index
                rows.map((i, ind) => {
                    if (i.key === params.id) {
                        index = ind
                        return
                    }
                })
                params.key = params.id
                rows.splice(index, 1, params)
                rows.splice(rows.length - 1, 1)
                rows.splice(0, 0, params)
                this.setState({
                    rows: rows,
                    modalVisible: false
                })
            }
        })
    }


    query = (params) => {
        params.pageNo = this.params.pageNo
        params.pageSize = this.params.pageSize
        params.field = this.params.field
        params.order = this.params.order
        this.params = params
        this.pageList()
    }

    handleChange = (pagination, filters, sorter) => {
        if (pagination) {
            this.params.pageNo = pagination.current
            this.params.pageSize = pagination.pageSize
        }
        if (sorter) {
            this.params.field = sorter.field
            this.params.order = sorter.order ? (sorter.order === 'ascend' ? 'ASC' : 'DESC') : sorter.order
        }
        this.pageList()
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectedRowKeys: selectedRowKeys, modalVisible: false})
        },
        getCheckboxProps: record => ({
            disabled: record.disabled,
            name: record.name,
        }),
    }

    render() {
        return (
            <div>
                <div>
                    <div className="table-operations">
                        {
                            this.btnTools.map(function (item) {
                                return item
                            })
                        }
                    </div>
                    {this.state.queryForm}
                </div>
                <Table columns={this.state.columns}
                       dataSource={this.state.rows}
                       onChange={this.handleChange}
                       rowSelection={this.props.deleteUrl ? this.rowSelection : null}
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
                <Modal
                    content={this.state.modalContent} visible={this.state.modalVisible}
                    onSubmit={this.submitForm}
                    title={this.state.modalTitle}
                />
            </div>
        )
    }

}
