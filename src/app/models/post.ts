export class Post {
    id: number
    user_id: number
    category_id: number
    title: string
    content: string
    image: string
    created_at: string
    updated_at: string

    constructor(args : {
        id?: number
        user_id?: number
        category_id?: number
        title?: string
        content?: string
        image?: string
        created_at?: string
        updated_at?: string
    } = {}) {
        this.id = args.id ?? 0,
        this.user_id = args.user_id ?? 0,
        this.category_id = args.category_id ?? 0,
        this.title = args.title ?? '',
        this.content = args.content ?? '',
        this.image = args.image ?? '',
        this.created_at = args.created_at ?? '',
        this.updated_at = args.updated_at ?? ''
    }
}
