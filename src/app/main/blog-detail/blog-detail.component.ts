import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { LIST_BLOG } from 'src/app/shared/data';
import { SeoService } from 'src/app/shared/services';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly document = inject(DOCUMENT);
  private readonly appConfig = injectAppConfig();
  slug = this.activatedRoute.snapshot.params['slug'];

  ngOnInit(): void {
    this.scrollToTop();
  }

  onMarkdownReady(): void {
    this.setTitleAndMetaData();
  }

  private setTitleAndMetaData(): void {
    const title = this.document.querySelector('h1')?.textContent;
    const description =
      LIST_BLOG.find((x) => x.slug === this.slug)?.description ||
      'This is something I know about Angular';
    if (title) {
      this.seoService.setTitle(`Tu Hoang - ${title}`);
      const seoData: MetaDefinition[] = [
        {
          name: 'title',
          content: `Tu Hoang - ${title}`,
        },
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: `Tu Hoang - ${title}`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `${this.appConfig.appDomain}/blog/${this.slug}`,
        },
        {
          property: 'og:description',
          content: description,
        },
      ];
      this.seoService.setMetaTags(seoData);
      return;
    }
    this.seoService.setTitle('Tu Hoang');
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
