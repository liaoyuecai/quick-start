import React from "react"
import BaseComponent from "../../common/BaseComponent"
import "./index.less"
import {Modal, Button} from 'antd'

export default class ModalFrame extends BaseComponent {
    state = {
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }


    handleCancel = () => {
        this.setState({visible: false})
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title={this.props.title}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.props.onSubmit}>
                            提交
                        </Button>,
                    ]}>
                    {this.props.content}
                </Modal>
            </div>
        )
    }
}
