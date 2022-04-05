import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProjectData } from 'src/app/shared/models';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkComponent implements OnInit {
  readonly listFeaturedProject: ReadonlyArray<ProjectData> = [
    {
      name: 'Ngx-Danmaku',
      description: 'Ngx-Danmaku is the Angular library to display flying comments on iframe element.',
      image: 'assets/img/danmaku.png',
      repoUrls: [
        {
          tooltip: 'Ngx-Danmaku',
          url: 'https://github.com/AndyT2503/ngx-danmanku'
        }
      ],
      tech: ['Angular', 'Typescript']
    },
    {
      name: 'E-commerce Shop',
      description: `E-commerce shop using Angular and .Net Core. Users can search, buy favorite products. Provide admin's management module, notification service that can send web notification or email notification.`,
      image: 'assets/img/cellphones.png',
      repoUrls: [
        {
          tooltip: 'Front-end',
          url: 'https://github.com/AndyT2503/ecommerceFE'
        },
        {
          tooltip: 'Back-end',
          url: 'https://github.com/AndyT2503/ecommerceBE'
        }
      ],
      tech: ['Angular', 'MailKit', '.NET Core', 'Redis']
    },
  ];

  readonly listOtherProject: ReadonlyArray<ProjectData> = [
    {
      name: 'Django Product Manager',
      description: 'System product management using Django.',
      repoUrls: [
        {
          tooltip: 'Django Product Manager',
          url: 'https://github.com/AndyT2503/django-product-manager'
        }
      ],
      tech: ['Django', 'Javascript', 'Ajax']
    },
    {
      name: 'Giphy Clone',
      description: `The Cloning Giphy Page integrate with Giphy public API. This app will show Trending GIFs, GIF's detail.`,
      repoUrls: [
        {
          tooltip: 'Giphy Clone',
          url: 'https://github.com/AndyT2503/giphy-clone'
        }
      ],
      tech: ['Angular', 'Ng-zorro', 'Akita']
    },
    {
      name: 'Flappy Bird',
      description: `The online version of Flappy Bird. Player can play and compare high scores with other players.`,
      repoUrls: [
        {
          tooltip: 'Flappy Bird',
          url: 'https://github.com/AndyT2503/FlappyBird'
        }
      ],
      tech: ['C#', 'Winform']
    },
    {
      name: 'V-Shop',
      description: `Project was built when I learnt ReactJs. This project using class component`,
      repoUrls: [
        {
          tooltip: 'V-Shop',
          url: 'https://github.com/AndyT2503/vshop'
        }
      ],
      tech: ['Bootstrap', 'ReactJs']
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
