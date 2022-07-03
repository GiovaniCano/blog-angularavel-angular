export class User {
    id: number
    name: string
    avatar: string
    description: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string

    constructor(args: {
        id?: number
        name?: string
        avatar?: string
        description?: string
        email?: string
        email_verified_at?: string
        created_at?: string
        updated_at?: string
    } = {}) {
        this.id = args.id ?? 0
        this.name = args.name ?? ''
        this.avatar = args.avatar ?? ''
        this.description = args.description ?? ''
        this.email = args.email ?? ''
        this.email_verified_at = args.email_verified_at ?? ''
        this.created_at = args.created_at ?? ''
        this.updated_at = args.updated_at ?? ''
    }
}