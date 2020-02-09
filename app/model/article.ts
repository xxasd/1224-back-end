// app/model/article.ts
import { Application } from 'egg'

module.exports = (app: Application) => {
    const { STRING, INTEGER, DATE, NOW, TEXT } = app.Sequelize;
    const Article = app.model.define('1224_articles', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        uuid: { type: STRING(255), allowNull: false },
        title: { type: STRING(255), allowNull: false },
        logo: { type: STRING(255) },
        content: { type: TEXT },
        likes: { type: INTEGER },
        reading: { type: INTEGER },
        status: { type: INTEGER, defaultValue: 1 },
        created_at: { type: DATE, defaultValue: NOW },
        updated_at: { type: DATE, defaultValue: NOW },
    })

    return Article;
}