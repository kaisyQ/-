import jwt from 'jsonwebtoken'
import { JWT_KEY as privateKey } from '../../../config/config.js'

export const signJwt = (email, password) => jwt.sign({email, password}, privateKey)

export const decodeJwt = (token) => jwt.verify(token, privateKey)
