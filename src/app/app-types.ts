import { User } from "./models/User"

export interface GenericResponse {
    msg?: string
    data?: {} | User
}

export interface Credentials {
    email: string
    password: string
}