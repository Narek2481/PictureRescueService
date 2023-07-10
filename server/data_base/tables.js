import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';



const User = sequelize.define('Users',
    {
        // Define the Users model attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        profile_image: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Image', // The name of the referenced table
                key: 'id' // The primary key of the referenced table
            },
            allowNull: true
        }
    },
    {
        tableName: "Users"
    }
);

const Image = sequelize.define('Image', {
    // Define the Image model attributes
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    ref_or_path: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    width_heght: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        },
        allowNull: true
    },
    public_or_private: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Public', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        },
        allowNull: true
    }

}, {
    tableName: "Image"
});

const Announcement = sequelize.define('Announcement', {
    // Define the Image model attributes
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_ref: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }

    },
    image_ref: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Image', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        },
        allowNull: true
    }
}, {
    tableName: "Announcement"
});

const Category = sequelize.define('Category', {
    // Define the Image model attributes
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    parent: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        },
        allowNull: true
    }

}, {
    tableName: 'Category'
});
const Public = sequelize.define('Public', {
    // Define the Image model attributes
    id: {
        type: DataTypes.BIGINT,
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
            model: 'Users', // The name of the referenced table
            key: 'id' // The primary key of the referenced table
        }
    }

}, {
    tableName: "Public"
});
Image.belongsTo(Public, { foreignKey: 'public_or_private' });
Public.hasMany(Image, { foreignKey: 'public_or_private' });

sequelize.sync()
    .then(() => console.log("  crated tables"))
    .catch((e) => e);
export { Public, Image, User, Announcement, Category }


