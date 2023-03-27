import { Sequelize, DataTypes } from 'sequelize';


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
// export default sequelize;
const User = sequelize.define('User', {
    // Define the User model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Image = sequelize.define('Image', {
    // Define the Image model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ref_or_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    width_heght: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    },
    public_or_private: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Public', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    }
});

const Announcement = sequelize.define('Announcement', {
    // Define the Image model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_ref: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    },
    image_ref: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Image', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    }
});

const Category = sequelize.define('Category', {
    // Define the Image model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    }

});
const Public = sequelize.define('Public', {
    // Define the Image model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    author: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    }

});


export {sequelize ,User,Image ,Announcement}