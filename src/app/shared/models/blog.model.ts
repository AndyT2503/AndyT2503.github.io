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
    return this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  constructor(blog: IBlog) {
    this.id = blog.id;
    this.title = blog.title;
    this.type = blog.type;
    this.date = blog.date;
    this.description = blog.description;
  }
}
