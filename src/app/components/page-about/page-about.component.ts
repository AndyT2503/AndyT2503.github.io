import { Router } from '@angular/router';
import { PortfolioService } from './../services/portfolio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss']
})
export class PageAboutComponent implements OnInit {

  constructor(private readonly portfolioService: PortfolioService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  goToContact(): void {
    this.portfolioService.updateCurrentMenuSelected('CONTACT');
    this.router.navigate(['contact']);
  }

}
