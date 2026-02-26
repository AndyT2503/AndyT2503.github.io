import { Menu } from '../models';

export const MENU: ReadonlyArray<Menu> = [
  {
    name: 'About',
    fragment: 'about',
  },
  {
    name: 'Experience',
    fragment: 'experience',
  },
  {
    name: 'Work',
    fragment: 'work',
  },
  {
    name: 'Blog',
    fragment: 'blog',
  },
  {
    name: 'Contact',
    fragment: 'contact',
  },
] as const;
