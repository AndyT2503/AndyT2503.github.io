import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MenuService } from '@shared/services';

@Component({ selector: 'app-general-info', standalone: true, template: '' })
class StubGeneralInfoComponent {}

@Component({ selector: 'app-about', standalone: true, template: '' })
class StubAboutComponent {}

@Component({ selector: 'app-experience', standalone: true, template: '' })
class StubExperienceComponent {}

@Component({ selector: 'app-work', standalone: true, template: '' })
class StubWorkComponent {}

@Component({ selector: 'app-blog', standalone: true, template: '' })
class StubBlogComponent {}

@Component({ selector: 'app-contact', standalone: true, template: '' })
class StubContactComponent {}

describe('HomeComponent', () => {
  it('updates MenuService and URL fragment based on visible section on scroll', async () => {
    const updateCurrentMenuSelected = vi.fn();
    const replaceState = vi.fn();

    TestBed.overrideComponent(HomeComponent, {
      set: {
        template: `
          <app-general-info #generalInfo></app-general-info>
          <app-about #about></app-about>
          <app-experience #experience></app-experience>
          <app-work #work></app-work>
          <app-blog #blog></app-blog>
          <app-contact #contact></app-contact>
        `,
        imports: [
          StubGeneralInfoComponent,
          StubAboutComponent,
          StubExperienceComponent,
          StubWorkComponent,
          StubBlogComponent,
          StubContactComponent,
        ],
      },
    });
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: MenuService, useValue: { updateCurrentMenuSelected } },
        { provide: Location, useValue: { path: () => '/', replaceState } },
      ],
    });

    const fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();

    // Make only the first section ("About") visible.
    const elements = Array.from(fixture.nativeElement.querySelectorAll('app-about, app-experience, app-work, app-blog, app-contact, app-general-info')) as HTMLElement[];
    const rects = {
      about: { top: 0, bottom: 200, height: 200 },
      other: { top: 2000, bottom: 2200, height: 200 },
    };
    for (const el of elements) {
      const isAbout = el.tagName.toLowerCase() === 'app-about';
      (el as any).getBoundingClientRect = () => (isAbout ? rects.about : rects.other);
    }

    fixture.componentInstance.ngAfterViewInit();
    await fixture.whenStable();

    document.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();

    expect(updateCurrentMenuSelected).toHaveBeenCalledWith('About');
    expect(replaceState).toHaveBeenCalledWith('/#about');
  });
});
