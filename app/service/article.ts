import { Service } from 'egg'

/**
 * Article Service
 */

interface ArticleCreateParams {
    uuid?: string,
    title: string,
    logo?: string,
    content: string,
}

export default class ArticleService extends Service {

    /**
     * 新建文章
     * @interface ArticleCreateParams
     * @param title - 标题
     * @param logo - 封面（网络地址）
     * @param content - 内容
     */
    public async create(article: ArticleCreateParams) {
        const { ctx } = this;
        
        const articleInfo = await ctx.model.Article.create(article);

        ctx.status = 200;
        ctx.returnBody(200, '创建成功', {
            id: articleInfo.id
        })

        return articleInfo;
    }

}