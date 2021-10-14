module.exports = (sequelize, DataTypes) => {
    let alias = 'Subscriptions';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(60)
        },
        isSubscribed: {
            type: DataTypes.BOOLEAN
        }
    };
    let config = {
        tableName: 'subscriptions',
        timestamps: false
    };
    const Subscription = sequelize.define(alias, cols, config);

    return Subscription
    
}

