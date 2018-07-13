import React from 'react'
import BaseComponent from '../../../common/BaseComponent'
import './index.less'
import {connect} from "react-redux"
import {Modal} from 'antd'

class Edit extends BaseComponent {

    constructor(props) {
        super(props)
    }

    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: true
        })
        if (!nextProps.community) {
            nextProps.getCommunity(nextProps.editId)
        }
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        })
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            })
        }, 2000)
    }

    handleCancel = () => {
        console.log('Clicked cancel button')
        this.setState({
            visible: false,
        })
    }

    render() {
        const {visible, confirmLoading, ModalText} = this.state
        return (
            <div>
                <Modal title="Title"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <p>{ModalText}</p>
                </Modal>
            </div>
        )
    }
}
export default connect(
    (state) => {
        const data = state.getIn(['tableReducers', 'community_data'])
        return {community: data}
    },
    (dispatch) => {
        return {
            getCommunity: (id) => {
                dispatch({type: 'COMMUNITY_GETTING', value: id})
            }
        }
    }
)(Edit)