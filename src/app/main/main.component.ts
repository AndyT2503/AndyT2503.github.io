import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject, OnInit
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  EmailComponent,
  FooterComponent,
  HeaderComponent,
  LoadingOpenComponent,
  SocialComponent
} from '../layout';
import { SessionStorageService } from '../shared/services';
import { StorageKey } from '../shared/const';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NzIconModule,
    EmailComponent,
    FooterComponent,
    HeaderComponent,
    LoadingOpenComponent,
    SocialComponent,
    RouterModule
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
    this.isOpen = this.storage.getItem<boolean>(StorageKey.wasLoaded) ? true : false;
    if(!this.isOpen) {
      setTimeout(() => {
        this.isOpen = true;
        this.storage.setItem(StorageKey.wasLoaded, true);
        this.cdr.markForCheck();
      }, 4000);
    }
  }
}
