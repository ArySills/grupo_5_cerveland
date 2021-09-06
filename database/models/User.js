module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING(50)
        },
        lastName: {
            type: dataTypes.STRING(50)
        },
        userName: {
            type: dataTypes.STRING(50)
        },
        userEmail: {
            type: dataTypes.STRING(30)
        },
        userPassword: {
            type: dataTypes.STRING(30)
        },
        profileImage: {
            type: dataTypes.STRING(50)
        },
        id_role: {
            type: dataTypes.INTEGER
        },
        rememberMe: {
            type: dataTypes.BOOLEAN
        },
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {

        User.belongsTo(
            models.UserRoles, 
            {
                as: 'usersrole',
                foreignKey: 'id_role'
                

            }
            );
        }
    return User
    
}

    