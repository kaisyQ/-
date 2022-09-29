import sequelize from "../db.js"

const User = sequelize.define(
    'User',
    {
        id: {
            type: Sequelize.NUMBER,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },

    },
    {
    }
)

export default User