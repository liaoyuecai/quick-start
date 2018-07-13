import React from "react"
import {Layout} from "antd"
import "./bottom.less"
import BaseComponent from "../../common/BaseComponent"

const {Footer} = Layout

export default class Bottom extends BaseComponent {


    render() {
        return (
            <Footer className="bottom animated bounceInLeft">
                <div className="text">
                    <div>
                        <span className="me"></span>
                        <span className="stay">Footer</span>
                    </div>
                </div>
            </Footer>
        )
    }
}