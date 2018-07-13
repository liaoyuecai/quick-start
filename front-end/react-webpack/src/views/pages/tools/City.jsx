import React from "react"
import {connect} from "react-redux"
import {Select} from "antd"
import "./index.less"
import BaseComponent from "../../../common/BaseComponent"
const Option = Select.Option


class City extends BaseComponent {
    constructor(props) {
        super(props)
        props.getCities()
    }

    state = {
        cities: [],
        selectCities: [],
        cityValue: ''
    }

    componentWillReceiveProps(nextProps) {
        const pid = nextProps.pid
        if (nextProps.cities && pid) {
            const cities = []
            nextProps.cities.map((city) => {
                if (city.parentId.includes(pid))
                    cities.push(city)
            })
            this.setState({
                cities: cities,
                selectCities: cities,
                cityValue: ''
            })
        }else {
            this.setState({
                selectCities: [],
                cityValue: ''
            })
        }
    }


    changeCity = (key, e) => {
        this.setState({
            cityValue: e.props.children,
        })
        if (!key) {
            this.setState({
                selectCities: this.state.cities
            })
        } else {
            const cities = []
            this.props.cities.map((city) => {
                if (city.name.includes(key)) {
                    cities.push(city)
                }
            })
            this.setState({
                selectCities: cities
            })
        }
    }

    render() {
        const cities = this.state.selectCities.map(city => <Option key={city.id}>{city.name}</Option>)
        return (
            <Select
                mode="combobox"
                value={this.state.cityValue}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                placeholder={this.props.cityPlaceholder}
                onChange={this.changeCity}
                onSelect={this.props.onSelect}
            >
                {cities}
            </Select>
        )
    }
}

export default connect(
    (state) => {
        const cities = state.getIn(['baseReducers', 'cities'])
        return {
            cities: cities ? cities : [],
            cityPlaceholder: '请选择城市'
        }
    },
    (dispatch) => {
        return {
            getCities: () => {
                dispatch({type: 'NATIVE_PLACE_GETTING', no: 1})
            }
        }
    }
)(City)