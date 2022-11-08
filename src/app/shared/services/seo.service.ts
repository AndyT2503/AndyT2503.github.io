import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private metaElements: HTMLMetaElement[] = [];
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setMetaTags(tags: MetaDefinition[]): void {
    this.metaElements.forEach((el) => this.meta.removeTagElement(el));
    this.metaElements = this.meta.addTags(tags, false);
  }
}
