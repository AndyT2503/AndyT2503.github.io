import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { MENU } from 'src/app/shared/data';
import { MenuService, SeoService } from 'src/app/shared/services';
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
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly menuService = inject(MenuService);
  private readonly seoService = inject(SeoService);
  private readonly appConfig = injectAppConfig();
  private destroyed$ = new Subject<void>();
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
    this.initEventGetCurrentElementIsReading();
  }

  private initEventGetCurrentElementIsReading(): void {
    fromEvent(this.document, 'scroll')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const listElement = [
          this.aboutComponent,
          this.experienceComponent,
          this.workComponent,
          this.blogComponent,
          this.contactComponent,
        ];
        let indexCurrentElementIsReading = -1;
        if (
          Math.trunc(this.document.body.scrollHeight) ===
          Math.trunc(window.innerHeight + window.scrollY)
        ) {
          indexCurrentElementIsReading = listElement.length - 1;
        } else {
          listElement.forEach((item, index) => {
            const top = item.nativeElement.getBoundingClientRect().top;
            if (top <= 1) {
              if (
                !listElement[indexCurrentElementIsReading] ||
                listElement[
                  indexCurrentElementIsReading
                ].nativeElement.getBoundingClientRect().top < top
              ) {
                indexCurrentElementIsReading = index;
              }
            }
          });
        }

        if (indexCurrentElementIsReading !== -1) {
          this.menuService.updateCurrentMenuSelected(
            MENU[indexCurrentElementIsReading].name
          );
        } else {
          this.menuService.updateCurrentMenuSelected('');
        }
      });
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
