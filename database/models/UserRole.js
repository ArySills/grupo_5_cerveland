module.exports = (sequelize, DataTypes) => {
    let alias = 'UserRoles';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(300)
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
                as: 'users',
                foreignKey: 'id_role'
                
            }
        );
    }

    return UserRole;
    }
