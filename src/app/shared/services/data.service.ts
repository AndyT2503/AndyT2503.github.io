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
      `assets/data/work-experience.json?t=${new Date().getTime()}`,
    );
  }

  getNormalProjectData() {
    return this.httpClient.get<ProjectData[]>(
      `assets/data/normal-project.json?t=${new Date().getTime()}`,
    );
  }

  getFeaturedProjectData() {
    return this.httpClient.get<ProjectData[]>(
      `assets/data/featured-project.json?t=${new Date().getTime()}`,
    );
  }

  getBlogData() {
    return this.httpClient
      .get<IBlog[]>(`assets/data/blog.json?t=${new Date().getTime()}`)
      .pipe(
        map((res) =>
          res
            .map((blog) => new Blog(blog))
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            ),
        ),
      );
  }

  getBlogDataBySlug(slug: string) {
    return this.httpClient
      .get<IBlog[]>(`assets/data/blog.json?t=${new Date().getTime()}`)
      .pipe(
        map((res) => res.map((blog) => new Blog(blog))),
        map((blogs) => {
          const blog = blogs.find((blog) => blog.slug === slug);
          if (!blog) {
            throw new Error(`Blog with slug "${slug}" not found`);
          }
          return blog;
        }),
      );
  }

  getRelatedBlogs(slug: string) {
    return this.getBlogData().pipe(
      map((blogs) => {
        const currentBlog = blogs.find((blog) => blog.slug === slug);
        if (!currentBlog) {
          throw new Error(`Blog with slug "${slug}" not found`);
        }

        return currentBlog.relatedBlogs
          .map((relatedId) => blogs.find((item) => item.id === relatedId)!)
          .sort((a, b) => {
            const dateDiff =
              new Date(b.date).getTime() - new Date(a.date).getTime();
            if (dateDiff !== 0) return dateDiff;
            return a.slug.localeCompare(b.slug);
          });
      }),
    );
  }
}
