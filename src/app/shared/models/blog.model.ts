export class Blog {
  id!: number;
  title!: string;
  type!: string;
  date!: string;
  minRead!: number;

  get slug() {
    return this.title.replaceAll(' ', '-').toLowerCase();
  }

  constructor(
    id: number,
    title: string,
    type: string,
    date: string,
    minRead: number
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.date = date;
    this.minRead = minRead;
  }
}
