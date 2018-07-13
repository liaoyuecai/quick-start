import React from "react"
import {connect} from "react-redux"
import {Select} from "antd"
import "./index.less"
import BaseComponent from "../../../common/BaseComponent"
const Option = Select.Option


class District extends BaseComponent {
    constructor(props) {
        super(props)
        props.getDistricts()
    }

    state = {
        districts: [],
        selectDistricts: [],
        districtValue: ''
    }

    componentWillReceiveProps(nextProps) {
        const pid = nextProps.pid
        if (nextProps.districts && pid) {
            const districts = []
            nextProps.districts.map((district) => {
                if (district.parentId.includes(pid))
                    districts.push(district)
            })
            this.setState({
                districts: districts,
                selectDistricts: districts,
                districtValue: ''
            })
        } else {
            this.setState({
                selectDistricts: [],
                districtValue: ''
            })
        }
    }


    changeDistrict = (key, e) => {
        this.setState({
            districtValue: e.props.children,
        })
        if (!key) {
            this.setState({
                selectDistricts: this.state.districts
            })
        } else {
            const districts = []
            this.props.districts.map((district) => {
                if (district.name.includes(key)) {
                    districts.push(district)
                }
            })
            this.setState({
                selectDistricts: districts
            })
        }
    }

    render() {
        const districts = this.state.selectDistricts.map(district => <Option key={district.id}>{district.name}</Option>)
        return (
            <Select
                mode="combobox"
                value={this.state.districtValue}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                placeholder={this.props.districtPlaceholder}
                onChange={this.changeDistrict}
                onSelect={this.props.onSelect}
            >
                {districts}
            </Select>
        )
    }
}

export default connect(
    (state) => {
        const districts = state.getIn(['baseReducers', 'districts'])
        return {
            districts: districts ? districts : [],
            districtPlaceholder: '请选择行政区'
        }
    },
    (dispatch) => {
        return {
            getDistricts: () => {
                dispatch({type: 'NATIVE_PLACE_GETTING', no: 2})
            }
        }
    }
)(District)