/**
 * 格式化工具
 */

/**
 * 将数据库的列表转换为遍历可用的列表
 * id转换为key
 * @param data
 */
export function IdToKey(data) {

    data.map(function (row) {
        row.key = row.id
    })

    return data
}