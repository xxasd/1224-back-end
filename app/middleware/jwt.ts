module.exports = (option, app) => {
    return async function (ctx, next) {
        // 在授权配置白名单内，则跳过token验证
        if (app.config.authWhiteList.includes(ctx.url)) {
            await next(option)
            return
        }
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const user = ctx.jwt.verify(token, app.config.jwtSecret);
                if (!user) {
                    ctx.returnBody(401, "登录时间过期")
                }

                ctx.user = user;
            } catch (error) {
                // console.log(err)
                ctx.returnBody(401, "登录时间过期", error)
                return
            }
            await next(option)
        } else {
            ctx.returnBody(401, "尚未登录")
            return
        }
    }
}