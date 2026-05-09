import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  EmailComponent,
  FooterComponent,
  HeaderComponent,
  SocialComponent
} from '../layout';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NzIconModule,
    EmailComponent,
    FooterComponent,
    HeaderComponent,
    SocialComponent,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
