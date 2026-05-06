
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  EmailComponent,
  FooterComponent,
  HeaderComponent,
  LoadingOpenComponent,
  SocialComponent,
} from '../layout';
import { StorageKey } from '../shared/const';
import { SessionStorageService } from '../shared/services';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NzIconModule,
    EmailComponent,
    FooterComponent,
    HeaderComponent,
    LoadingOpenComponent,
    SocialComponent,
    RouterOutlet
],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private readonly storage = inject(SessionStorageService);
  private platformId = inject(PLATFORM_ID);
  isOpen = signal(false);

  ngOnInit(): void {
    this.showLoadingAnimation();
  }

  private showLoadingAnimation() {
    if (isPlatformServer(this.platformId)) {
      this.isOpen.set(true);
      return;
    }
    this.isOpen.set(!!this.storage.getItem(StorageKey.wasLoaded));
    if (!this.isOpen()) {
      setTimeout(() => {
        this.isOpen.set(true);
        this.storage.setItem(StorageKey.wasLoaded, true);
      }, 4000);
    }
  }
}
