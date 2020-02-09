import { Controller } from 'egg'

export default class UserController extends Controller {

    /**
     * 注册/登录/退出登录
     * @return {Promise<*>}
     */

    //  注册
    public async register() {
        const { ctx } = this;
        const { email, password } = ctx.request.body

        // error
        if(!this.__errNotice) return

        // 注册成功返回体
        await ctx.service.user.register({ email, password });
    }

    // 登录
    public async loginIn() {
        const { ctx, app } = this;
        const { email, password } = ctx.request.body;

        // 登录获取token
        const token = await ctx.service.user.login({email, password});

        // 设置cookie
        if (token) {
            // id存入cookie，用于验证国企
            const options = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: false,
                domain: app.config.security.defaultMiddleware[0]
            };
            // cookie 有效期7天
            ctx.cookies.set(this.config.auth_cookie_name, token, options)
            ctx.set("Authorization", `Bearer ${token}`)
            ctx.returnBody(200, '登录成功')
        } else {
            ctx.throw(400, '用户名或密码错误')
        }

    }

    // 参数异常函数
    private __errNotice () {
        const { ctx } = this;
        const { mobile, password, code, username, email } = ctx.request.body
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