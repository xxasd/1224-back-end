import * as uuid from 'uuid'

import { Service } from 'egg';

/**
 * User Service
 */

interface RegisterParams {
    uuid: string,
    nickname: string,
    email: string,
    password: string
}

// interface LoginParams {
//     email: string,
//     password: string
// }

export default class UserService extends Service {

  /**
   * @interface register
   * @param nickname - 昵称
   * @param email - 邮箱
   * @param password - 密码
   */
  public async register(user: RegisterParams) {
    const { ctx } = this;

    // 添加uuid
    user.uuid = uuid.v4();

    
  }
}
