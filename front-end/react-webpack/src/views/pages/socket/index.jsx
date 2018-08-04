import React from "react"
import BaseComponent from "../../../common/BaseComponent"
import "./index.less"
import DataTable from "../../../component/table/index"

export default class Socket extends BaseComponent {
    componentWillReceiveProps(nextProps) {
        let ws = new WebSocket('ws://localhost:7072/websocket')
        ws.last_health_time = -1; // 上一次心跳时间
        ws.keepalive = function () {
            let time = new Date().getTime();
            if (ws.last_health_time !== -1 && time - ws.last_health_time > 20000) { // 不是刚开始连接并且20s
                ws.close()
            } else {
                // 如果断网了，ws.send会无法发送消息出去。ws.bufferedAmount不会为0。
                if (ws.bufferedAmount === 0 && ws.readyState === 1) {
                    ws.send('h&b');
                    ws.last_health_time = time;
                }
            }
        }
        if (ws) {
            let reconnect = 0; //重连的时间
            let reconnectMark = false; //是否重连过
            this.setState({
                notificationSocket: true
            })
            ws.onopen = () => {
                reconnect = 0;
                reconnectMark = false;
                ws.receiveMessageTimer = setTimeout(() => {
                    console.log(ws.readyState)
                    ws.close();
                }, 3000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
                if (ws.readyState === 1) { // 为1表示连接处于open状态
                    ws.keepAliveTimer = setInterval(() => {
                        ws.keepalive();
                    }, 1000)
                }

            }
            ws.onerror = () => {
                console.error('onerror')
            }
            ws.onmessage = (msg) => {
                console.log(msg.data)
                clearTimeout(ws.receiveMessageTimer);
                ws.receiveMessageTimer = setTimeout(() => {
                    ws.close();
                }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
            }
        }
    }

    render() {

        return (
            <div>
                11111111111
            </div>
        )
    }
}