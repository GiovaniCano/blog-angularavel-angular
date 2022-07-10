export interface Session {
    isLogged: boolean
    isVerified: boolean
    userName: string
    userAvatar: string | null
}

export interface Credentials {
    email: string
    password: string
}