import { Menu } from '../models';

export const MENU: ReadonlyArray<Menu> = [
  {
    name: 'About',
    link: '#about',
  },
  {
    name: 'Experience',
    link: '#experience',
  },
  {
    name: 'Work',
    link: '#work',
  },
  {
    name: 'Blog',
    link: '#blog',
  },
  {
    name: 'Contact',
    link: '#contact',
  },
] as const;
