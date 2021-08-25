module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productName: {
            type: dataTypes.STRING(50)
        },
        productPrice: {
            type: dataTypes.DECIMAL(10,0)
        },
        id_productCategory: {
            type: dataTypes.INTEGER
        },
        productDescription: {
            type: dataTypes.STRING(300)
        },
        productImage: {
            type: dataTypes.STRING(100)
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {

        Product.belongsTo(
            models.ProductsCategories, 
            {
                foreignKey: 'id_productCategory',
                as: 'productsCategories'

            }
            );
        }
    return Product
    
}

