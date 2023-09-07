import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { fromEvent, startWith, takeUntil } from 'rxjs';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { MENU } from 'src/app/shared/data';
import {
  DestroyService,
  MenuService,
  SeoService,
} from 'src/app/shared/services';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { GeneralInfoComponent } from '../general-info/general-info.component';
import { WorkComponent } from '../work/work.component';
import { BlogComponent } from './../blog/blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    GeneralInfoComponent,
    WorkComponent,
    BlogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class HomeComponent implements AfterViewInit, OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly menuService = inject(MenuService);
  private readonly seoService = inject(SeoService);
  private readonly appConfig = injectAppConfig();
  private readonly ngZone = inject(NgZone);
  private destroyed$ = inject(DestroyService);
  @ViewChild('generalInfo', { read: ElementRef })
  generalInfoComponent!: ElementRef;
  @ViewChild('about', { read: ElementRef }) aboutComponent!: ElementRef;
  @ViewChild('experience', { read: ElementRef })
  experienceComponent!: ElementRef;
  @ViewChild('work', { read: ElementRef }) workComponent!: ElementRef;
  @ViewChild('blog', { read: ElementRef }) blogComponent!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactComponent!: ElementRef;

  ngOnInit(): void {
    this.setupSeo();
  }

  ngAfterViewInit(): void {
    this.setupGetCurrentElementIsReading();
  }

  private setupGetCurrentElementIsReading(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.document, 'scroll')
        .pipe(startWith(null), takeUntil(this.destroyed$))
        .subscribe(() => {
          const setElements = [
            this.aboutComponent,
            this.experienceComponent,
            this.workComponent,
            this.blogComponent,
            this.contactComponent,
            this.generalInfoComponent,
          ];
          const setVisibleHeightOfElement = setElements.map((item) =>
            this.calculateVisibleHeightOfElement(
              item.nativeElement.getBoundingClientRect().top,
              item.nativeElement.getBoundingClientRect().height,
              item.nativeElement.getBoundingClientRect().bottom
            )
          );
          const indexCurrentElementIsReading =
            setVisibleHeightOfElement.indexOf(
              Math.max(...setVisibleHeightOfElement)
            );
          if (!MENU[indexCurrentElementIsReading]) {
            this.menuService.updateCurrentMenuSelected('');
          } else {
            this.menuService.updateCurrentMenuSelected(
              MENU[indexCurrentElementIsReading].name
            );
          }
        });
    });
  }

  /**
   * return visible height of element if it is not visible, return -1
   */
  private calculateVisibleHeightOfElement(
    top: number,
    height: number,
    bottom: number
  ): number {
    if (bottom < 0) {
      return -1;
    }
    if (top > window.innerHeight) {
      return -1;
    }
    if (top < 0 && bottom >= window.innerHeight) {
      return height;
    }
    if (top < 0 && bottom < window.innerHeight) {
      return bottom;
    }
    return window.innerHeight - top;
  }

  private setupSeo(): void {
    const seoData: MetaDefinition[] = [
      {
        name: 'title',
        content: 'Tu Hoang - Portfolio',
      },
      {
        name: 'description',
        content: `This is Tu Hoang's portfolio was built by Angular`,
      },
      {
        property: 'og:title',
        content: 'Tu Hoang - Portfolio',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: this.appConfig.appDomain,
      },
      {
        property: 'og:description',
        content: `This is Tu Hoang's portfolio was built by Angular`,
      },
    ];
    this.seoService.setTitle('Tu Hoang - Portfolio');
    this.seoService.setMetaTags(seoData);
  }
}
