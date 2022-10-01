export const getCookie = (req) => {
    if (req.headers.cookie) {
        return req.headers.cookie
    }
    return null
}