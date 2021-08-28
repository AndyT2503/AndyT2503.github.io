import { ProjectDetails } from './data/project-detail.data';
import { ProjectDetail } from './data/project-detail.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-project-detail',
  templateUrl: './page-project-detail.component.html',
  styleUrls: ['./page-project-detail.component.scss']
})
export class PageProjectDetailComponent implements OnInit {
  projectDetail = {} as ProjectDetail;
  constructor(
    private activateRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getProjectDetail();
  }

  getProjectDetail(): void {
    const slug = this.activateRoute.snapshot.params.slug;
    const projectDetail = ProjectDetails.find(item => item.slug === slug);
    if (!projectDetail) {
      this.router.navigate(['project']);
      return;
    }
    this.projectDetail = projectDetail;
  }

}
