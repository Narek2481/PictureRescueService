import Sequelize from 'sequelize';



const config = {
    development: {
        username: 'postgres',
        password: '123',
        database: 'image_project',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
};
const { username, password, database, host, dialect, port } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port
});





export {sequelize}




