export interface IBlog {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
}

export class Blog {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  get slug() {
    return this.title.replaceAll(' ', '-').toLowerCase();
  }

  constructor(
    blog: IBlog
  ) {
    this.id = blog.id;
    this.title = blog.title;
    this.type = blog.type;
    this.date = blog.date;
    this.description = blog.description;
  }
}
