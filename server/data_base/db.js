import Sequelize from "sequelize";


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
const sequelize = new Sequelize(config.development);
export default sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: false
    },
    Emil: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: false
    },
    Password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: false
    },
    Last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: false
    }
});

const image = sequelize.define("image", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ref_or_path: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: false
    },
    width_heght: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: false
    }
    // category: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     defaultValue: false,

    // },
    // public_or_private: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     defaultValue: false,
    // }
});
(async () => await User.sync())();
(async () => await image.sync())();
