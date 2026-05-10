import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MobileHeaderComponent } from './mobile-header.component';

describe('MobileHeaderComponent', () => {
  it('renders brand and resume link', async () => {
    TestBed.configureTestingModule({
      imports: [MobileHeaderComponent],
      providers: [provideRouter([])],
    });

    const fixture = TestBed.createComponent(MobileHeaderComponent);
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    const resume = fixture.nativeElement.querySelector(
      '.mobile-header__resume',
    ) as HTMLAnchorElement;
    expect(text).toContain('TU HOANG');
    expect(text).toContain('Frontend Engineer');
    expect(resume.getAttribute('href')).toBe('assets/cv/cv.pdf');
  });
});
