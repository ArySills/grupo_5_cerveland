module.exports = (sequelize, dataTypes) => {
    let alias = 'UsersRole';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50)
        },
        description: {
            type: dataTypes.STRING(300)
        }
    };
    let config = {
        tableName: 'usersrole',
        timestamps: false
    };
    const UserRole = sequelize.define(alias, cols, config);

    UserRole.associate = function (models) {

        UserRole.hasMany(models.Users,
            {
                foreignKey: 'id_role',
                as: 'users'
            }
        );
    }

    return UserRole
    }
