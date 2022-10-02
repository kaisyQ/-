// import { DataTypes } from "sequelize"
// import sequelize from "../../../db.js"
// import { Links } from "./links/links.js"


// export const Profile = sequelize.define(
//     'Profile',  
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             unique: true,
//             primaryKey: true,
//             allowNull: false,
//         },
//         status: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         aboutMe: {
//             type: DataTypes.TEXT,
//             allowNull: true
//         },
//         aboutMyJob: {
//             type: DataTypes.TEXT,
//             allowNull: true
//         },
//         linksId: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Links,
//                 key: 'id'
//             }
//         }
//     }
// )