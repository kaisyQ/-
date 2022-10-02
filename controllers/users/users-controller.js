// import User from "../../database/models/user/user.js"
// import { getUsersApi } from "./api/getUsers.js"

// export const getUsers = async (req, res) => {

//     const { pageSize, pageNumber } = req.params
//     //const responseUsers = await getUsersApi(pageSize, pageNumber)
//     const responseUsers = await User.findAll()
//     res
//         .json(JSON.stringify({ responseUsers }))
//         .status(200)
// }