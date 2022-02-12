export class Comments {
  constructor(
    public id: number,
    public news_id: string,
    public author: string,
    public comment: string,
  ) {}
}

export interface NewsData {
  [key: string]: any;
  title: string;
  content: string;
  image: File | null;
  date: string;
}
