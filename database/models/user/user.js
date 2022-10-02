// import { DataTypes } from "sequelize"
// import sequelize from "../../db.js"
// import { Profile } from "./profile/profile.js"

// const User = sequelize.define(
//     'User',
//     {
//         id: {
//             type: DataTypes.NUMBER,
//             primaryKey: true,
//             unique: true,
//             allowNull: false
//         },
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         lastName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         profileId: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Profile,
//                 key: 'id'
//             }
//         }
//     }
// )

// export default User