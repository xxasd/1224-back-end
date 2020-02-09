import * as uuid from 'uuid'
import * as md5 from 'md5'
import { Service } from 'egg'

/**
 * User Service
 */

interface RegisterParams {
  uuid?: string,
  nickname?: string,
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
    const queryResult = await this.hasRegister(user.email);
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
   * 根据邮箱查询该用户是否存在
   * @param email - 邮箱
   */
  private async hasRegister(email: string) {

    // 根据邮箱查询该用户是否存在
    const user = await this.ctx.model.User.findOne({
      where: { email: email }
    });

    if (user && user.dataValues.uuid) {
      return true;
    }

    return false
  }
}
