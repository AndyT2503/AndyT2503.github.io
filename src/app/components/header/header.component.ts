import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PortfolioService } from './../services/portfolio.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuSelected!: string;
  listMenu = [
    {
      title: 'ABOUT',
      link: 'about'
    },
    {
      title: 'PROJECTS',
      link: 'project'
    },
    {
      title: 'CONTACT',
      link: 'contact'
    }
  ];
  destroyed$ = new Subject<void>();
  constructor(private readonly router: Router, private readonly portfolioService: PortfolioService) { }
  ngOnInit(): void {
    this.getCurrentMenuSelected();
    this.initCurrentPageSelected();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initCurrentPageSelected(): void {
    const currentRoute = location.href;
    const currentPage = this.listMenu.find(x => currentRoute.includes(x.link));
    if (currentPage) {
      this.portfolioService.updateCurrentMenuSelected(currentPage.title);
      return;
    }
    this.portfolioService.updateCurrentMenuSelected('ABOUT');
  }

  getCurrentMenuSelected(): void {
    this.portfolioService.currentMenuSelected$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(item => {
        this.menuSelected = item;
      });
  }

  onSelectMenu(item: { title: string; link: string }): void {
    this.portfolioService.updateCurrentMenuSelected(item.title);
    this.router.navigate([`${item.link}`]);
  }

}
