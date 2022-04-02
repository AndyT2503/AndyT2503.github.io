import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
