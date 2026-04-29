import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { MENU } from '@shared/data';
import { MenuService } from '@shared/services';
import { injectScrollEvent } from '@shared/utils';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { GeneralInfoComponent } from '../general-info/general-info.component';
import { WorkComponent } from '../work/work.component';
import { BlogComponent } from './../blog/blog.component';
import { isPlatformBrowser, Location } from '@angular/common';

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
export class HomeComponent implements AfterViewInit {
  private readonly location = inject(Location);
  private readonly menuService = inject(MenuService);
  private readonly ngZone = inject(NgZone);
  private readonly scrollEvent$ = injectScrollEvent();
  @ViewChild('generalInfo', { read: ElementRef })
  generalInfoComponent!: ElementRef;
  @ViewChild('about', { read: ElementRef }) aboutComponent!: ElementRef;
  @ViewChild('experience', { read: ElementRef })
  experienceComponent!: ElementRef;
  @ViewChild('work', { read: ElementRef }) workComponent!: ElementRef;
  @ViewChild('blog', { read: ElementRef }) blogComponent!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactComponent!: ElementRef;

  ngAfterViewInit(): void {
    this.setupGetCurrentElementIsReading();
  }

  private setupGetCurrentElementIsReading(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scrollEvent$.subscribe(() => {
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
            item.nativeElement.getBoundingClientRect().bottom,
          ),
        );
        const indexCurrentElementIsReading = setVisibleHeightOfElement.indexOf(
          Math.max(...setVisibleHeightOfElement),
        );
        const path = this.location.path().split('#')[0];
        const menu = MENU[indexCurrentElementIsReading];
        if (!menu) {
          this.menuService.updateCurrentMenuSelected('');
          this.location.replaceState(path);
        } else {
          this.menuService.updateCurrentMenuSelected(menu.name);
          const path = this.location.path().split('#')[0];
          this.location.replaceState(path + '#' + menu.fragment);
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
    bottom: number,
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
}
