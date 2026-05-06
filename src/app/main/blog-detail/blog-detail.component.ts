import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { DataService } from '../../shared/services/data.service';
import { isPlatformServer } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { IBlog } from '@shared/models';

interface JsonLDData {
  title: string;
  description: string;
  url: string;
  image: string;
  date: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  @Input() slug!: string;

  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly dataService = inject(DataService);
  private readonly document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.scrollToTop();
    this.setSeo();
  }

  private setSeo(): void {
    const defaultTitle = 'Tu Hoang - Angular Software Engineer';

    if (!this.slug) {
      this.titleService.setTitle(defaultTitle);
      return;
    }

    this.dataService.getBlogData().subscribe({
      next: (blogs) => {
        const blog = blogs.find((item) => item.slug === this.slug);

        if (!blog) {
          this.titleService.setTitle(defaultTitle);
          return;
        }

        const fullTitle = `${blog.title} | Angular & TypeScript Insights by Tu Hoang`;
        const url = `https://tuhoangdev.netlify.app/blog/${this.slug}`;
        const image = `https://tuhoangdev.netlify.app/content/images/${this.slug}/default.jpg`;

        this.titleService.setTitle(fullTitle);

        this.meta.updateTag({
          name: 'description',
          content: blog.description,
        });

        this.meta.updateTag({
          name: 'keywords',
          content: 'Angular, TypeScript, Tu Hoang, AndyT2503, tuhoangdev',
        });

        this.meta.updateTag({
          name: 'robots',
          content: 'index, follow',
        });

        this.meta.updateTag({
          property: 'og:type',
          content: 'article',
        });

        this.meta.updateTag({
          property: 'og:title',
          content: fullTitle,
        });

        this.meta.updateTag({
          property: 'og:description',
          content: blog.description,
        });

        this.meta.updateTag({
          property: 'og:image',
          content: image,
        });

        this.meta.updateTag({
          property: 'og:url',
          content: url,
        });

        this.meta.updateTag({
          name: 'twitter:card',
          content: 'summary_large_image',
        });

        this.meta.updateTag({
          name: 'twitter:title',
          content: fullTitle,
        });

        this.meta.updateTag({
          name: 'twitter:description',
          content: blog.description,
        });

        this.meta.updateTag({
          name: 'twitter:image',
          content: image,
        });

        this.setCanonical(url);

        this.injectJsonLd({
          title: fullTitle,
          description: blog.description,
          url,
          image,
          date: blog.date,
        });
      },
    });
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector(
      "link[rel='canonical']",
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private injectJsonLd(data: JsonLDData): void {
    const existing = this.document.getElementById('json-ld');
    if (existing) existing.remove();

    const script = this.document.createElement('script');
    script.id = 'json-ld';
    script.type = 'application/ld+json';

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: 'Tu Hoang',
          alternateName: 'AndyT2503',
          url: 'https://tuhoangdev.netlify.app',
          image: 'https://tuhoangdev.netlify.app/assets/img/avatar.jpg',
          jobTitle: 'Software Engineer',
          knowsAbout: ['Angular', 'TypeScript', 'Web Development'],
          sameAs: [
            'https://github.com/AndyT2503',
            'https://www.linkedin.com/in/tu-hoang-787951195/',
            'https://www.facebook.com/AndyTu.Hoang/',
          ],
        },
        {
          '@type': 'BlogPosting',
          headline: data.title,
          description: data.description,
          image: data.image,
          url: data.url,
          datePublished: new Date(data.date).toISOString(),
          author: {
            '@type': 'Person',
            name: 'Tu Hoang',
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }

  private scrollToTop(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
