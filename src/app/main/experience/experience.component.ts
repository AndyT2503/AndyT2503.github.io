import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

interface WorkExperience {
  companyName: string;
  role: string;
  time: string;
  jobDetails: string[];
  url: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzTabsModule],
})
export class ExperienceComponent {
  readonly listWorkExperience: ReadonlyArray<WorkExperience> = [
    {
      companyName: 'Smartlog',
      role: 'Junior Software Engineer',
      time: 'August 2020 - February 2022',
      url: 'https://gosmartlog.com/',
      jobDetails: [
        'Working with team to build logistic solutions',
        'Developed product with Angular, .Net Core and PostgeSQL',
        'Built Container Optimization Solution, which is the first re-use container platform in Vietnam',
        'Guide fresher and intern members to learn Angular and .NET Core',
      ],
    },
    {
      companyName: 'TagForm.com.my',
      role: 'Middle Software Engineer',
      time: 'March 2022 - Present',
      url: 'https://tagform.com.my/',
      jobDetails: [
        `Developed Tracking System with Selenium, which can tracking performance of company websites and alert when they slowed`,
        'Developed and maintained code for Transportation Management System using Ionic, .NET Core',
        'Built Ngx-Danmaku, which is Angular library using for display flying comments on video',
      ],
    },
    {
      companyName: 'Smartlog',
      role: 'Part-time Business Analyst',
      time: 'March 2022 - Present',
      url: 'https://gosmartlog.com/',
      jobDetails: [
        'Analysing business requirement from customer and work with technical team to develop product',
        'Creating document workflow of feature with BPMN diagram',
      ],
    },
  ];
}
