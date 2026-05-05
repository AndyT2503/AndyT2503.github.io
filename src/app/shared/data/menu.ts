import { Menu } from '../models';

export const MENU: ReadonlyArray<Menu> = [
  {
    name: 'Intro',
    fragment: 'intro',
  },
  {
    name: 'About',
    fragment: 'about',
  },
  {
    name: 'Experience',
    fragment: 'experience',
  },
  {
    name: 'Projects',
    fragment: 'projects',
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
