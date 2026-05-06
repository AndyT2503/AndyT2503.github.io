import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideIconComponent } from '@shared/components';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent],
})
export class ContactComponent {
  readonly email = 'htu25399@gmail.com';

  readonly socialLinks = [
    {
      icon: 'github',
      label: 'GitHub',
      href: 'https://github.com/AndyT2503',
      glow: 'linear-gradient(90deg, rgba(255,0,110,0.75), rgba(251,86,7,0.75))',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tu-hoang-787951195/',
      glow: 'linear-gradient(90deg, rgba(131,56,236,0.75), rgba(58,134,255,0.75))',
    },
    {
      icon: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/htu.18/',
      glow: 'linear-gradient(90deg, rgba(251,86,7,0.75), rgba(255,190,11,0.75))',
    },
    {
      icon: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/AndyTu.Hoang/',
      glow: 'linear-gradient(90deg, rgba(25,125,245,0.75), rgba(88,144,236,0.75))',
    },
  ] as const;
}
