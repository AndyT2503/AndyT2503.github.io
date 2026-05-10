import { TestBed } from '@angular/core/testing';

import { IntroComponent } from './intro.component';
import { provideEnvironment } from '@shared/providers';
import { MenuService } from '@shared/services/menu.service';

describe('IntroComponent', () => {
  it('exposes open-to-work state and scrolls to a requested section', async () => {
    const menuService = { scrollToSection: vi.fn() };

    TestBed.overrideComponent(IntroComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [IntroComponent],
      providers: [
        { provide: MenuService, useValue: menuService },
        provideEnvironment({
          repoName: 'repo',
          sourceControlApi: 'https://api.example.com/repos/',
          sourceControlUrl: 'https://example.com/',
          domainUrl: 'https://example.com',
          isOpenToWork: true,
        }),
      ],
    });

    const fixture = TestBed.createComponent(IntroComponent);
    fixture.componentInstance.scrollToSection('contact');
    await fixture.whenStable();

    expect(fixture.componentInstance.isOpenToWork).toBe(true);
    expect(menuService.scrollToSection).toHaveBeenCalledWith('contact');
  });
});
