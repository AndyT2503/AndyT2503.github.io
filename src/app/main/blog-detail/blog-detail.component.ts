import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { DataService, SeoService } from 'src/app/shared/services';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  @Input() slug!: string
  private readonly seoService = inject(SeoService);
  private readonly dataService = inject(DataService);
  private readonly document = inject(DOCUMENT);
  private readonly appConfig = injectAppConfig();

  ngOnInit(): void {
    this.scrollToTop();
  }

  onMarkdownReady(): void {
    this.setTitleAndMetaData();
  }

  private setTitleAndMetaData(): void {
    const title = this.document.querySelector('h1')?.textContent;
    if (!title) {
      this.seoService.setTitle('Tu Hoang');
      return;
    }
    this.dataService.getBlogData().subscribe((listBlog) => {
      const description =
        listBlog.find((x) => x.slug === this.slug)?.description ||
        'This is something I know about Angular';
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
    });
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
