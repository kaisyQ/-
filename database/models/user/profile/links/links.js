import sequelize from "../../../../db.js"
import { DataTypes } from "sequelize"

export const Links = sequelize.define(
    'Links',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        vk: {
            type: DataTypes.STRING,
            allowNull: true
        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)