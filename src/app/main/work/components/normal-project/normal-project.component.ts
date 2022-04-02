import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProjectData } from '../../model/project.model';

@Component({
  selector: 'app-normal-project',
  templateUrl: './normal-project.component.html',
  styleUrls: ['./normal-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormalProjectComponent implements OnInit {
  @Input() projectData!: ProjectData; 
  constructor() { }

  ngOnInit(): void {
  }

  openRepo(url: string): void {
    window.open(url, '_blank');
  }

}
