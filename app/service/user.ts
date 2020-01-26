import * as uuid from 'uuid'

import { Service } from 'egg';

/**
 * User Service
 */

interface RegisterParams {
  uuid?: string,
  email: string,
  password: string
}

// interface LoginParams {
//     email: string,
//     password: string
// }

export default class UserService extends Service {

  /**
   * 用户注册
   * @interface RegisterParams
   * @param email - 邮箱
   * @param password - 密码
   */
  public async register(user: RegisterParams) {
    const { ctx } = this;
    // 添加uuid
    user.uuid = uuid.v1();

    // 是否已经注册
    const queryResult = await this.hasRegister(user.email);
    if (queryResult) {
      ctx.returnBody(200, '邮箱已被注册');
      return
    }
    ctx.returnBody(200, '可以注册');
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
