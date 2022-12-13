export class Blog {
  id!: number;
  title!: string;
  type!: string;
  date!: string;
  minRead!: number;
  description!: string;

  get slug() {
    return this.title.replaceAll(' ', '-').toLowerCase();
  }

  constructor(
    id: number,
    title: string,
    type: string,
    date: string,
    minRead: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.date = date;
    this.minRead = minRead;
    this.description = description;
  }
}
