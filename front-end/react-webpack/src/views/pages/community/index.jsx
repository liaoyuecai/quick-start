import React from "react"
import {connect} from "react-redux"
import {Button, Input, Select, Table} from "antd"
import TablePage from "../table"
import "./index.less"
import Provinces from "../tools/Province"
import Edit from './edit'
import Cities from "../tools/City"
import Districts from "../tools/District"
import moment from 'moment'
const Option = Select.Option

class Community extends TablePage {
    constructor(props) {
        super(props)
        const tableParams = this.state.tableParams
        tableParams.filters = '_id,name,provinceName,cityName,districtName,address,confirm,isSpecial'
        this.state.provinces = []
        this.state.cities = []
        this.state.districts = []
        this.state.value = ''
        this.provincesPlaceholder = '请选择省份'
        props.getTableData(this.state.tableParams)
    }

    onLoadQR = (text, e) => {
        this.setState({
            tableAction: 'COMMUNITY_TABLE_1'
        })
    }

    searchCommunity = () => {
        const tableParams = this.state.tableParams
        tableParams.provinceId = this.state.undefined
        tableParams.cityId = this.state.cityId
        tableParams.districtId = this.state.districtId
        tableParams.communityName = this.state.communityName
        tableParams.address = this.state.address
        tableParams.confirm = this.state.confirm
        tableParams.special = this.state.special
        this.resetCommunityParams()
    }

    resetCommunityParams = () => {
        const tableParams = this.state.tableParams
        tableParams.provinceId = this.state.provinceId
        tableParams.cityId = this.state.cityId
        tableParams.districtId = this.state.districtId
        tableParams.communityName = this.state.communityName
        tableParams.address = this.state.address
        tableParams.confirm = this.state.confirm
        tableParams.special = this.state.special
        this.props.getTableData(this.state.tableParams)
    }

    resetCommunity = () => {
        this.setState({
            provinceId: undefined,
            cityId: undefined,
            districtId: undefined,
            communityName: undefined,
            address: undefined,
            confirm: undefined,
            special: undefined
        })
        this.resetCommunityParams()
    }


    selectProvince = (value) => {
        this.setState({
            provinceId: value
        })
    }

    selectCity = (value) => {
        this.setState({
            cityId: value
        })
    }
    selectDistrict = (value) => {
        this.setState({
            districtId: value
        })
    }


    render() {
        let {sortedInfo} = this.state
        sortedInfo = sortedInfo || {}
        const columns = [{
            title: '楼盘名称',
            dataIndex: 'name',
            width: 100,
            key: 'name'
        }, {
            title: '省份',
            dataIndex: 'provinceName',
            width: 80,
            key: 'provinceName'
        }, {
            title: '城市',
            dataIndex: 'cityName',
            width: 80,
            key: 'cityName'
        }, {
            title: '行政区',
            dataIndex: 'districtName',
            width: 80,
            key: 'districtName'
        }, {
            title: '地址',
            dataIndex: 'address',
            width: 180,
            key: 'address'
        }, {
            title: '确认',
            dataIndex: 'confirm',
            width: 60,
            key: 'confirm',
            render: (text, record, index) => {
                return <a href="javascript:" onClick={() => {
                    const value = {
                        id: record.key,
                        confirm: text ? false : true
                    }
                    this.props.changeAttr('COMMUNITY_EDIT', value, this.state.tableParams)
                }}>{text ? '是' : '否'}</a>
            }
        }, {
            title: '特殊',
            dataIndex: 'isSpecial',
            width: 60,
            key: 'isSpecial',
            render: (text, record, index) => {
                return <a href="javascript:" onClick={() => {
                    const value = {
                        id: record.key,
                        isSpecial: text ? false : true
                    }
                    this.props.changeAttr('COMMUNITY_EDIT', value, this.state.tableParams)
                }}>{text ? '是' : '否'}</a>
            }
        },
            {
                title: '操作',
                dataIndex: '',
                width: 100,
                key: 'action',
                render: (text, record, index) => {
                    return <div>
                        <a className="interval-item" href="javascript:" onClick={() => {
                            this.setState({
                                editId: record.key,
                                random: moment().format('X')
                            })
                        }}>编辑</a>
                        <a href="javascript:">删除</a>
                    </div>
                }
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
                    <Provinces id={this.state.provinceId} onSelect={this.selectProvince}/>
                    <Cities pid={this.state.provinceId} onSelect={this.selectCity}/>
                    <Districts pid={this.state.cityId} onSelect={this.selectDistrict}/>
                    <Input placeholder="楼盘名称"
                           value={this.state.communityName}
                           onChange={(e) => {
                               this.setState({
                                   communityName: e.target.value
                               })
                           }}/>
                    <Input placeholder="地址" value={this.state.address}
                           onChange={(e) => {
                               this.setState({
                                   address: e.target.value
                               })
                           }}/>
                    <Select style={{width: 100}} placeholder="是否确认" value={this.state.confirm}
                            onSelect={(value) => {
                                this.setState({
                                    confirm: value
                                })
                            }}>
                        <Option key={true}>是</Option>
                        <Option key={false}>否</Option>
                    </Select>
                    <Select style={{width: 100}} placeholder="是否特殊" value={this.state.special}
                            onSelect={(value) => {
                                this.setState({
                                    special: value
                                })
                            }}>
                        <Option key={true}>是</Option>
                        <Option key={false}>否</Option>
                    </Select>
                    <div className="float-right">
                        <Button type="primary" onClick={this.searchCommunity}>搜索</Button>
                        <Button onClick={this.resetCommunity}>重置</Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={this.props.data}
                    onChange={this.handleChange}
                    rowSelection={this.rowSelection}
                    scroll={{y: 400}}
                    pagination={{
                        total: this.props.total,
                        pageSize: this.props.pageSize,
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        showTotal: function () {
                            return '共' + this.total + '条数据'
                        }
                    }}
                />
                <Edit editId={this.state.editId} random={this.state.random}/>
            </div>
        )
    }
}

export default connect(
    (state) => {
        const page = state.getIn(['tableReducers', 'community_table_data'])
        if (page) {
            return {
                data: page ? page.rows : null,
                total: page ? page.totalPage : 0,
                pageSize: page ? page.pageSize : 10
            }
        }
        return {}
    },
    (dispatch) => {
        return {
            getTableData: (params) => {
                dispatch({type: 'COMMUNITY_TABLE', value: params})
            },
            changeAttr: (type, value, params) => {
                dispatch({type: type, value: value, params: params})
            }
        }
    }
)(Community)