// app/model/user.ts
import { Application } from 'egg'

module.exports = (app: Application) => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const User = app.model.define('1224_users', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        uuid: { type: STRING(255) },
        email: { type: STRING(255), allowNull: false },
        password: { type: STRING(255), allowNull: false },
        nickname: { type: STRING(255) },
        avatar: { type: STRING(255) },
        phone: { type: STRING(20) },
        status: { type: INTEGER, defaultValue: 1 },
        created_at: { type: DATE, defaultValue: NOW },
        updated_at: { type: DATE, defaultValue: NOW }
    })

    return User;
}