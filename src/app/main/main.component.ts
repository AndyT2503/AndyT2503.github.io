
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PortfolioLayoutComponent,
} from '../layout';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    PortfolioLayoutComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
}
