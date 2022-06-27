import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { MenuService } from 'src/app/shared/services';
import {
  AboutComponent,
  ContactComponent,
  ExperienceComponent,
  GeneralInfoComponent,
  WorkComponent,
} from '.';
import {
  EmailComponent,
  FooterComponent,
  HeaderComponent,
  LoadingOpenComponent,
  SocialComponent,
  appMenuList,
} from '../layout';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NzIconModule,
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    GeneralInfoComponent,
    WorkComponent,
    EmailComponent,
    FooterComponent,
    HeaderComponent,
    LoadingOpenComponent,
    SocialComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly menuService = inject(MenuService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);
  @ViewChild('about', { read: ElementRef }) aboutComponent!: ElementRef;
  @ViewChild('experience', { read: ElementRef })
  experienceComponent!: ElementRef;
  @ViewChild('work', { read: ElementRef }) workComponent!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactComponent!: ElementRef;

  private destroyed$ = new Subject<void>();
  isOpen = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen = true;
      this.cdr.markForCheck();
    }, 4000);
  }

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
            appMenuList[indexCurrentElementIsReading].name
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
