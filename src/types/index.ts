interface Post {
    _id: string,
    title: string,
    content: string,
    createdBy: {
        _id: string,
        fullname: string,
    },
    likes: number,
    liked: boolean,
    views: number,
    description?: string,
    picture?: string,
    category?: {
        _id: string,
        name: string,
    },
    createdAt: string,
    updatedAt: string,
}

type PostPreview = Omit<Post, 'content'>;

export { Post, PostPreview };