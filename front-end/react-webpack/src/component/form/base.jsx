import React from "react"
import BaseComponent from "../../common/BaseComponent"
import "./query.less"
import {Form, Col, Input, InputNumber, Select} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

export default class BaseForm extends BaseComponent {

    formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8}
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16}
        },
    }

    inputQItem = (item) => {
        const {getFieldDecorator} = this.props.form
        return <Col span={item.span ? item.span : 4} style={{marginRight: 5}} key={item.key}>
            <FormItem>
                {getFieldDecorator(item.key, {})(
                    <Input placeholder={item.title ? item.title : ''}/>
                )}
            </FormItem></Col>
    }

    inputQNumberItem = (item) => {
        const {getFieldDecorator} = this.props.form
        return <Col span={item.span ? item.span : 4} style={{marginRight: 5}} key={item.key}>
            <FormItem>
                {getFieldDecorator(item.key, {})(
                    <InputNumber placeholder={item.title ? item.title : ''}/>
                )}
            </FormItem></Col>
    }


    inputTItem = (item) => {
        const {getFieldDecorator} = this.props.form
        return <FormItem key={item.key} {...this.formItemLayout}
                         label={item.title ? item.title : ''} style={{display: item.key === 'id' ? 'none' : 'block'}}>
            {getFieldDecorator(item.key, {
                rules: [{
                    required: item.required ? item.required : false, message: item.message ? item.message : '',
                }],
            })(
                <Input placeholder={item.remarks ? item.remarks : ''}/>
            )}
        </FormItem>
    }

    inputTNumberItem = (item) => {
        const {getFieldDecorator} = this.props.form
        return <FormItem key={item.key} {...this.formItemLayout}
                         label={item.title}>
            {getFieldDecorator(item.key, {
                rules: [{
                    required: item.required ? item.required : false, message: item.message ? item.message : '',
                }],
            })(
                <InputNumber placeholder={item.remarks ? item.remarks : ''}/>
            )}
        </FormItem>
    }


    selectQItem = (item) => {
        const {getFieldDecorator} = this.props.form
        const options = []
        item.source.map((i) => {
            options.push(<Option key={i.key} value={i.key}>{i.value}</Option>)
        })
        return <Col span={item.span ? item.span : 4} style={{marginRight: 5}} key={item.key}>
            <FormItem>
                {getFieldDecorator(item.key, {})(
                    <Select>
                        {options}
                    </Select>
                )}
            </FormItem></Col>
    }

    selectTItem = (item) => {
        const {getFieldDecorator} = this.props.form
        const options = []
        item.source.map((i) => {
            options.push(<Option key={i.key} value={i.key}>{i.value}</Option>)
        })
        return <FormItem key={item.key} {...this.formItemLayout} label={item.title}>
            {getFieldDecorator(item.key, {})(
                <Select>
                    {options}
                </Select>
            )}
        </FormItem>
    }

    initQFormItems = () => {
        const formItems = []
        const items = this.props.items
        if (items && items.length) {
            items.map((i) => {
                switch (i.type) {
                    case 'text':
                        formItems.push(this.inputQItem(i))
                    case 'number':
                        formItems.push(this.inputQNumberItem(i))
                        break
                    case 'select':
                        formItems.push(this.selectQItem(i))
                        break
                    default:
                        formItems.push(this.inputQItem(i))
                        break
                }
            })
        }
        return formItems
    }

    initTFormItems = () => {
        const formItems = []
        const items = this.props.items
        if (items && items.length) {
            items.map((i) => {
                switch (i.type) {
                    case 'text':
                        formItems.push(this.inputTItem(i))
                    case 'number':
                        formItems.push(this.inputTNumberItem(i))
                        break
                    case 'select':
                        formItems.push(this.selectTItem(i))
                        break
                    default:
                        formItems.push(this.inputTItem(i))
                        break
                }
            })
        }
        return formItems
    }

}
