import { Controller } from 'egg'

class UserController extends Controller {

    /**
     * 注册 register
     * @return {Promise<*>}
     */
    public async register() {
        const { ctx } = this;
        const { email, password } = ctx.request.body

        // error
        if(!this.__errNotice) return

        // 注册成功返回体
        await ctx.service.user.register({ email, password });
    }

    // 参数异常函数
    private __errNotice () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body
        // 参数校验
        let message;
        if (!mobile || !email) {
            message = '手机号或者邮箱不能为空'
        } else if (!code) {
            message = '验证码不能为空'
        } else if (!username) {
            message = '用户名为空'
        } else if (!password) {
            message = '密码不能为空'
        }

        // 抛出异常
        if (message) {
            ctx.throw(400, message);
            return false
        }
        return true
    }

}

module.exports = UserController;