module.exports = (sequelize, DataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productName: {
            type: DataTypes.STRING(50)
        },
        productPrice: {
            type: DataTypes.DECIMAL(10,0)
        },
        id_productCategory: {
            type: DataTypes.INTEGER
        },
        productDescription: {
            type: DataTypes.STRING(300)
        },
        productImage: {
            type: DataTypes.STRING(100)
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {

        Product.belongsTo(
            models.ProductCategories, 
            {
                as: 'productscategories',
                foreignKey: 'id_productCategory'
            }
            );
        }
    return Product
    
}

