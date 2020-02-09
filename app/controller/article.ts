import { Controller } from 'egg'

export default class ArticleController extends Controller {

    /**
     * 新增/编辑/删除
     * @return {Promise<*>}
     */

    // 新增文章
    public async articleCreat() {
        const { ctx } = this;
        const { title, logo, content } = ctx.request.body

        // 用户uuid
        const uuid = ctx.user.uuid;

        const newArticle = {
            title,
            logo,
            content,
            uuid
        }

        const article = await ctx.service.article.articleCreat(newArticle)

        ctx.returnBody(200, "发布成功", article);
    }
}