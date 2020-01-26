import { Controller } from 'egg';

export default class TestController extends Controller {
  public async posting() {
    const { ctx } = this;
    ctx.body = {
        name: this.ctx.request.body.name
    }
    
  }
}