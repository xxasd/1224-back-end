import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as jwt from 'jsonwebtoken'
import { Service } from 'egg'

/**
 * User Service
 */

// 注册接口
interface RegisterParams {
  uuid?: string,
  nickname?: string,
  email: string,
  password: string
}

// 登录接口
interface LoginParams {
  email: string,
  password: string
}

export default class UserService extends Service {

  /**
   * 用户注册
   * @interface RegisterParams
   * @param email - 邮箱
   * @param password - 密码
   */
  public async register(user: RegisterParams) {
    const { ctx } = this;
    // 用户添加uuid
    user.uuid = uuid.v1();
    // 用户昵称默认为用户邮箱
    user.nickname = user.email;
    // 用户密码md5加密
    user.password = md5(user.password);

    // 是否已经注册
    const queryResult = await this.hasUser(user.email);
    if (queryResult) {
      // 已被注册
      ctx.returnBody(400, '邮箱已被注册');
      return
    }

    // 可以注册，注册成功时返回给前端
    const userInfo = await ctx.model.User.create(user);

    ctx.status = 200;
    ctx.returnBody(200, '注册成功', {
      userInfo
    });
    return userInfo;
  }

  /**
   * 用户登录
   * @interface LoginParams
   * @param email - 邮箱
   * @param password - 密码
   */
  public async login(user: LoginParams) {
    const { app } = this;

    const existUser = await this.hasUser(user.email);

    // 用户不存在
    if (!existUser) {
      return false
    }

    // 获取登录密码
    user.password = md5(user.password);
    const existUserPassword = existUser.password;

    // 检查密码是否一致
    const passwordEqual = existUserPassword === user.password;

    if (!passwordEqual) {
      return false
    }

    // 邮箱密码验证成功
    const token = jwt.sign({ uuid: existUser.uuid }, app.config.jwtSecret, { expiresIn: '30d' });

    return token;

  }

  /**
   * 根据邮箱查询该用户是否存在
   * @param email - 邮箱
   */
  private async hasUser(email: string) {

    // 根据邮箱查询该用户是否存在
    const user = await this.ctx.model.User.findOne({
      where: { email: email }
    });

    if (user && user.dataValues.uuid) {
      return user;
    }

    return false
  }
}
