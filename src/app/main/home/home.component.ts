import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy, ViewChild
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { MENU } from 'src/app/shared/data';
import { MenuService } from 'src/app/shared/services';
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
    BlogComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly menuService = inject(MenuService);
  private destroyed$ = new Subject<void>();
  @ViewChild('about', { read: ElementRef }) aboutComponent!: ElementRef;
  @ViewChild('experience', { read: ElementRef })
  experienceComponent!: ElementRef;
  @ViewChild('work', { read: ElementRef }) workComponent!: ElementRef;
  @ViewChild('blog', { read: ElementRef }) blogComponent!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactComponent!: ElementRef;

  ngAfterViewInit(): void {
    this.initEventGetCurrentElementIsReading();
  }

  initEventGetCurrentElementIsReading(): void {
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
          this.document.body.scrollHeight ===
          window.innerHeight + window.scrollY
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
