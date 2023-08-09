import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  EmailComponent,
  FooterComponent,
  HeaderComponent,
  LoadingOpenComponent,
  SocialComponent
} from '../layout';
import { StorageKey } from '../shared/const';
import { SessionStorageService } from '../shared/services';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgIf,
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
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly storage = inject(SessionStorageService);
  isOpen!: boolean;

  ngOnInit(): void {
    this.showLoadingAnimation();
  }

  private showLoadingAnimation() {
    this.isOpen = !!this.storage.getItem(StorageKey.wasLoaded);
    if(!this.isOpen) {
      setTimeout(() => {
        this.isOpen = true;
        this.storage.setItem(StorageKey.wasLoaded, true);
        this.cdr.markForCheck();
      }, 4000);
    }
  }
}
