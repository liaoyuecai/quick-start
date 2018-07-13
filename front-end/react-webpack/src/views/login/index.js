import React from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {Button, Form, Input} from "antd"
import BaseComponent from "../../common/BaseComponent"
import "./index.less"

const FormItem = Form.Item

class LoginPage extends BaseComponent {

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loginFun(values)
            }
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form
        const {logined} = this.props
        if (logined) {
            return <Redirect from="/login" to="/"/>
        }
        return (
            <div className="loginpagewrap">
                <div className="box">
                    <p>Welcome</p>
                    <div className="loginWrap">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{required: true, message: '请输入用户名'}],
                                })(
                                    <Input placeholder="请输入用户名："/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码'}],
                                })(
                                    <Input type="password" placeholder="请输入密码："/>
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="loginBtn">登录</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

let Login = Form.create()(LoginPage)
export default connect(
    (state) => {
        return {
            logined: state.getIn(['loginReducers', 'logined']),
        }
    },
    (dispatch) => {
        return {
            loginFun: (value) => {
                dispatch({type: 'LOGIN_REQUEST', value: value})
            }
        }
    }
)(Login)