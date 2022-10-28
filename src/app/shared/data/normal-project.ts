import { ProjectData } from '../models';
export const NORMAL_PROJECTS: ReadonlyArray<ProjectData> = [
  {
    name: 'Django Product Manager',
    description: 'System product management using Django.',
    repoUrls: [
      {
        tooltip: 'Django Product Manager',
        url: 'https://github.com/AndyT2503/django-product-manager',
      },
    ],
    tech: ['Django', 'Javascript', 'Ajax'],
  },
  {
    name: 'Giphy Clone',
    description: `The Cloning Giphy Page integrate with Giphy public API. This app will show Trending GIFs, GIF's detail.`,
    repoUrls: [
      {
        tooltip: 'Giphy Clone',
        url: 'https://github.com/AndyT2503/giphy-clone',
      },
    ],
    tech: ['Angular', 'Ng-zorro', 'Akita'],
  },
  {
    name: 'Flappy Bird',
    description: `The online version of Flappy Bird. Player can play and compare high scores with other players.`,
    repoUrls: [
      {
        tooltip: 'Flappy Bird',
        url: 'https://github.com/AndyT2503/FlappyBird',
      },
    ],
    tech: ['C#', 'Winform'],
  },
  {
    name: 'V-Shop',
    description: `Project was built when I learnt ReactJs. This project using class component`,
    repoUrls: [
      {
        tooltip: 'V-Shop',
        url: 'https://github.com/AndyT2503/vshop',
      },
    ],
    tech: ['Bootstrap', 'ReactJs'],
  },
];
