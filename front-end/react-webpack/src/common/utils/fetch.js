/**
 * url: 请求URL
 * data：请求传递参数
 * type：请求方式
 * timeout: 超时请求
 * header：请求响应头
 * body_type：body请求数据类型
 * mode：是否跨域
 * credentials：跨域请求是否带cookie
 * return_type：返回数据格式
 * cache: 如何处理缓存
 */

import {warning} from "./dialog"

require('es6-promise').polyfill()
require('isomorphic-fetch')

export default async (url = '',
                      data = {},
                      type = 'GET',
                      timeout = 0,
                      body_type = 'json',
                      return_type = 'json',
                      headers = {},
                      mode = 'cors',
                      credentials = 'omit',
                      cache = 'no-cache',) => {
    if ('fetch' in window) {
        const newType = type.toUpperCase()
        let newHeaders = headers
        if (JSON.stringify(newHeaders) === '{}') {
            newHeaders = {
                'Content-Type': 'application/json',
            }
        }

        // 配置fetch options
        const requestConfig = {
            method: newType,
            headers: newHeaders,
            mode,
            credentials,
            cache,
        }

        if (type !== 'GET') {
            if (body_type === 'form') {
                let dataStr = ''
                Object.keys(data).map((index) => {
                    const param = encodeURI(data[index])
                    dataStr += `${index}=${param}&`
                    return true
                })
                requestConfig.body = dataStr
            } else if (body_type === 'file') {
                const dataStr = new FormData()
                Object.keys(data).map((index) => {
                    dataStr.append(index, data[index])
                    return true
                })
                requestConfig.body = dataStr
            } else if (body_type === 'json') {
                requestConfig.body = JSON.stringify(data)
            }
        } else {
            let dataStr = ''
            Object.keys(data).map((key) => {
                dataStr = `${dataStr}${key}=${data[key]}&`
                return true
            })

            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                url = `${url}?${dataStr}`
            }
        }
        return Promise.race([
            fetch(url, requestConfig),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('request timeout')), timeout || 5 * 1000)
            }),
        ]).then((response) => {

            console.log(response)
            if (response.status !== 200) {
                warning("系统异常,请联系管理员!")
                return null
            }
            if (return_type === 'json') {
                return response.json()
            } else if (return_type === 'text') {
                return response.text()
            } else if (return_type === 'blob') {
                return response.blob()
            } else if (return_type === 'formData') {
                return response.formData()
            } else if (return_type === 'arrayBuffer') {
                return response.arrayBuffer()
            }
        }).catch(err => {
            console.log(err)
            warning("系统错误,请联系管理员!")
        })
    }
}
