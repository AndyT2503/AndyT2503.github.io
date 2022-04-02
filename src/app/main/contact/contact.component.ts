import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openMessenger(): void {
    window.open('http://m.me/AndyTu.Hoang/', '_blank');
  }
}
