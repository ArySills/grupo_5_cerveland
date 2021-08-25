module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductsCategories';
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
        tableName: 'productscategories',
        timestamps: false
    };
    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = function (models) {

        ProductCategory.hasMany(models.Products,
            {
                foreignKey: 'id_productCategory',
                as: 'products'
            }
        );
    }

    return ProductCategory
    }