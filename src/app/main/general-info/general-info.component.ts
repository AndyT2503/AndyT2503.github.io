import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
