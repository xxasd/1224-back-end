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

        const article = await ctx.service.article.articleCreate(newArticle)

        const articleReturn = {
            id: article.id,
            title,
            logo,
            content,
            updatedAt: article.update_at,
            createdAt: article.create_at,
        }

        ctx.returnBody(200, "success", articleReturn);
    }

    /**
     * 文章列表
     * @return {Promise<*>}
     */
    public async articleList() {
        const { ctx } = this;

        const articleList = await ctx.service.article.articleList();

        ctx.returnBody(200, "success" ,articleList)
    }
}