import React from "react"
import BaseForm from './base'
import "./query.less"
import {Form, Row, Col, Button} from 'antd'

class QueryForm extends BaseForm {
    handleSearch = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            this.props.onSubmit(values)
        })
    }

    handleReset = () => {
        this.props.form.resetFields()
    }


    render() {
        const formItems = this.initQFormItems()
        return (
            <div style={{paddingBottom: 10}}>
                <Form onSubmit={this.handleSearch}>
                    <Row>
                        {formItems.map((i) => i)}
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

let Query = Form.create()(QueryForm)
export default Query