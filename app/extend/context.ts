// 扩展方法

const jwt = require("jsonwebtoken");

module.exports = {
    // 获取json的token
    get jwt() {
        return jwt;
    },

    /**
     * 返回客户信息
     * @param status   // 返回状态
     * @param message  // 返回信息
     * @param data     // 返回内容
     */
    returnBody (status, message, data = {}) {
        this.status = status;
        this.body = {
            status,
            data,
            message: message
        }
    },
    
}