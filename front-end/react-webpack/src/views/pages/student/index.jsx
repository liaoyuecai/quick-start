import React from "react"
import BaseComponent from "../../../common/BaseComponent"
import "./index.less"
import DataTable from "../../../component/table/index"

export default class Student extends BaseComponent {

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        }, {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record, index) => {
                return text == 0 ? '男' : '女'
            }
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        }]

        const urls = {
            pageUrl: 'http://localhost:7073/application/sample/student/studentPage',
            deleteUrl: 'http://localhost:7073/application/sample/student/delete',
            insertUrl: 'http://localhost:7073/application/sample/student/insert',
            editUrl: 'http://localhost:7073/application/sample/student/update'
        }
        const formItems = [{
            key: 'name', title: '姓名', required: true, message: '姓名不能为空'
        }, {
            type: 'number', key: 'age', title: '年齡'
        }, {
            type: 'select', key: 'sex', title: '性別', source: [{key: 0, value: '男'}, {key: 1, value: '女'}], value: 0
        }, {
            key: 'phone', title: '手机号'
        }]
        const queryItems = [{key: 'name', title: '姓名'},
            {type: 'number', key: 'age', title: '年龄'}
        ]
        return (
            <div>
                <DataTable
                    urls={urls}
                    columns={columns}
                    formItems={formItems}
                    queryItems={queryItems}
                />
            </div>
        )
    }
}