import { Blog } from '../models';

export const LIST_BLOG: ReadonlyArray<Blog> = [
  new Blog(
    1,
    'Deep understanding about Expression has changed after it was checked',
    'Angular',
    '27 October 2022',
    'Explain why Angular throw Expression has changed after it was checked'
  ),
  new Blog(
    2,
    'What is NgZone and How it trigger Change Detection',
    'Angular',
    '25 February 2023',
    'Explain how ngZone work in Angular'
  ),
];
