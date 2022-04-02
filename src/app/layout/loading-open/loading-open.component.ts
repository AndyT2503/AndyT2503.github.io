import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-open',
  templateUrl: './loading-open.component.html',
  styleUrls: ['./loading-open.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingOpenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
