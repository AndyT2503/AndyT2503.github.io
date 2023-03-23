import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Blog, IBlog, ProjectData, WorkExperience } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly httpClient = inject(HttpClient);

  getWorkExperienceData() {
    return this.httpClient.get<WorkExperience[]>(
      'assets/data/work-experience.json'
    );
  }

  getNormalProjectData() {
    return this.httpClient.get<ProjectData[]>(
      'assets/data/normal-project.json'
    );
  }

  getFeaturedProjectData() {
    return this.httpClient.get<ProjectData[]>(
      'assets/data/featured-project.json'
    );
  }

  getBlogData() {
    return this.httpClient
      .get<IBlog[]>('assets/data/blog.json')
      .pipe(map((res) => res.map((blog) => new Blog(blog))));
  }
}
