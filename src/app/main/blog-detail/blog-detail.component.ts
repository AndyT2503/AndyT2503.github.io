import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { SeoService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';

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
  slug = this.activatedRoute.snapshot.params['slug'];

  ngOnInit(): void {
    this.scrollToTop();
  }

  onMarkdownReady(): void {
    this.setTitleAndMetaData();
  }

  private setTitleAndMetaData(): void {
    const title = this.document.querySelector('h1')?.textContent;
    if (title) {
      this.seoService.setTitle(`Tu Hoang - ${title}`);
      const seoData: MetaDefinition[] = [
        {
          name: 'title',
          content: `Tu Hoang - ${title}`,
        },
        {
          name: 'description',
          content: `This is something I know about Angular`,
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
          content: `${environment.appDomain}/blog/${this.slug}`,
        },
        {
          property: 'og:description',
          content: `This is something I know about Angular`,
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
