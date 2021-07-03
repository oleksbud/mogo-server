export interface Author {
    _id?: string;
    id: number;
    name: string;
}

export interface Book {
    _id?: string;
    id: number;
    title: string;
    initialAuthorId?: number;
    authorId?: string;
}
