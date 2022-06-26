import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-open',
  templateUrl: './loading-open.component.html',
  styleUrls: ['./loading-open.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoadingOpenComponent {}
