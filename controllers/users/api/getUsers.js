import User from "../../../database/models/user/user.js"

export const getUsersApi = async (pageSize=10, pageNumber=1) => {
    let users = []
    try {
        users = await User.findAll()
    } catch (err) {
        console.error(err)
    }
    const jsonUsers = users.map(user => user.toJSON())
    return jsonUsers.slice(((pageNumber-1)*pageSize)+1, pageNumber*pageSize+1)
}