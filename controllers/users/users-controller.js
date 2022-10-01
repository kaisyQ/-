import { getUsersApi } from "./api/getUsers.js"

export const getUsers = async (req, res) => {

    const { pageSize, pageNumber } = req.params
    const responseUsers = await getUsersApi(pageSize, pageNumber)

    res
        .json({ responseUsers })
        .status(200)
        .statusText('Successful Operation')
}