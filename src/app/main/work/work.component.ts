
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from 'src/app/shared/services';
import { FeaturedProjectComponent } from './components/featured-project/featured-project.component';
import { NormalProjectComponent } from './components/normal-project/normal-project.component';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeaturedProjectComponent, NormalProjectComponent],
})
export class WorkComponent {
  private readonly dataService = inject(DataService);
  readonly listFeaturedProject = toSignal(this.dataService.getFeaturedProjectData());
  readonly listOtherProject = toSignal(this.dataService.getNormalProjectData());
}
