import Sequelize from 'sequelize';



const config = {
    development: {
        username: 'postgres',
        password: '123',
        database: 'imageProject1',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
};
console.log(process.env.DB_PORT)
const { username, password, database, host, dialect, port } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port
});





export {sequelize}




