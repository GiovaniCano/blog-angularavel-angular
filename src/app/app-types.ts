export interface Session {
    isLogged: boolean
    isVerified: boolean
    name: string
    avatar: string | null
    email: string
}

export interface Credentials {
    email: string
    password: string
}