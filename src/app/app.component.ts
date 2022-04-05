import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { appMenuList } from './layout/header/components/menu/menu.component';
import { MenuService } from './shared/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('about', { read: ElementRef }) aboutComponent!: ElementRef;
  @ViewChild('experience', { read: ElementRef }) experienceComponent!: ElementRef;
  @ViewChild('work', { read: ElementRef }) workComponent!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactComponent!: ElementRef;

  private destroyed$ = new Subject<void>();
  isOpen = false;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.isOpen = true, 4000);
  }

  ngAfterViewInit(): void {
    this.initEventGetCurrentElementIsReading();
  }

  initEventGetCurrentElementIsReading(): void {
    fromEvent(document, 'scroll').pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      const listElement = [this.aboutComponent, this.experienceComponent, this.workComponent, this.contactComponent];
      let indexCurrentElementIsReading = -1;
      if (document.body.scrollHeight === window.innerHeight + window.scrollY) {
        indexCurrentElementIsReading = listElement.length - 1;
      } else {
        listElement.forEach((item, index) => {
          const top = item.nativeElement.getBoundingClientRect().top;
          if (top <= 1) {
            if (!listElement[indexCurrentElementIsReading] || listElement[indexCurrentElementIsReading].nativeElement.getBoundingClientRect().top < top) {
              indexCurrentElementIsReading = index;
            }
          }
        });
      }

      if (indexCurrentElementIsReading !== -1) {
        this.menuService.updateCurrentMenuSelected(appMenuList[indexCurrentElementIsReading].name);
      } else {
        this.menuService.updateCurrentMenuSelected('');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
