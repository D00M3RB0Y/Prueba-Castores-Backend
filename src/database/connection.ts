import { Sequelize } from "sequelize";

const sequelize = new Sequelize('api-castores', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize