import React from "react"
import {connect} from "react-redux"
import {Select} from "antd"
import BaseComponent from "../../../common/BaseComponent"
const Option = Select.Option


class Province extends BaseComponent {
    constructor(props) {
        super(props)
        props.getProvinces()
    }

    state = {
        provinces: [],
        provinceValue: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.provinces) {
            this.setState({
                provinces: nextProps.provinces
            })
        }
        if (!nextProps.id){
            this.setState({
                provinceValue: ''
            })
        }
    }

    changeProvince = (key, e) => {
        this.setState({
            provinceValue: e.props.children
        })
        if (!key) {
            this.setState({
                provinces: this.props.provinces
            })
        } else {
            const provinces = []
            this.props.provinces.map((province) => {
                if (province.name.includes(key)) {
                    provinces.push(province)
                }
            })
            this.setState({
                provinces
            })
        }
    }

    render() {

        const provinces = this.state.provinces.map(province => <Option key={province.id}>{province.name}</Option>)
        return (
            <span>
                    <Select
                        mode="combobox"
                        value={this.state.provinceValue}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        placeholder={this.props.provincesPlaceholder}
                        onChange={this.changeProvince}
                        onSelect={this.props.onSelect}
                    >
                        {provinces}
                    </Select>
            </span>
        )
    }
}

export default connect(
    (state) => {
        const provinces = state.getIn(['baseReducers', 'provinces'])
        return {
            provinces: provinces ? provinces : [],
            provincesPlaceholder:'请选择省份'
        }
    },
    (dispatch) => {
        return {
            getProvinces: () => {
                dispatch({type: 'NATIVE_PLACE_GETTING', no: 0})
            }
        }
    }
)(Province)