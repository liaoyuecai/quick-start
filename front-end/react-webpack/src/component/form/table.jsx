import React from "react"
import BaseForm from './base'
import {Form} from "antd"

class TableForm extends BaseForm {

    render() {
        const formItems = this.initTFormItems()
        return (
            <div style={{paddingBottom: 10, paddingRight: 100}}>
                <Form onSubmit={this.handleSearch}>
                    {formItems.map((i) => i)}
                </Form >
            </div>
        )
    }
}
const EnhancedForm = Form.create()(TableForm)
export default EnhancedForm