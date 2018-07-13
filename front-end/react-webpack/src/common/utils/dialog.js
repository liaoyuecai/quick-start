import {Modal} from "antd"

export function success(message) {
    Modal.success({
        title: '提示',
        content: message,
    })
}

export function error(message) {
    Modal.error({
        title: '错误',
        content: message
    })
}

export function warning(message) {
    Modal.warning({
        title: '警告',
        content: message
    })
}