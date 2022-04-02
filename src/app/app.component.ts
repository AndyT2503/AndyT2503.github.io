import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOpen = false;

  ngOnInit(): void {
    setTimeout(() => this.isOpen = true, 4000);
  }
}
