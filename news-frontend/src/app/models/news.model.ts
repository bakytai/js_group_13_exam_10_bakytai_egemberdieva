export class News {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public image: string,
    public date: string,
  ) {}
}

export interface NewsData {
  [key: string]: any;
  title: string;
  content: string;
  image: File | null;
  date: string;
}
