import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
