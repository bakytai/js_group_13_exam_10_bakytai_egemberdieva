export class Comments {
  constructor(
    public id: number,
    public news_id: string,
    public author: string,
    public comment: string,
  ) {}
}

export interface CommentsData {
  [key: string]: any;
  author: string;
  comment: string;
}
