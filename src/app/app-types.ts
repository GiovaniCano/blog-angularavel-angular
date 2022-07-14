export interface Session {
    isLogged: boolean
    isVerified: boolean
    name: string
    avatar: string | null
    email: string
    firstLoad: boolean
}

export interface Credentials {
    email: string
    password: string
    remember?: boolean
}

export interface RegisterCredentials {
    email: string
    name: string
    password: string
    password_confirmation: string
}