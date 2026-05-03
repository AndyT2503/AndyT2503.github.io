import { TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('initializes scroll listener on init', async () => {
    TestBed.overrideComponent(HeaderComponent, {
      set: {
        imports: [],
        template: `<header #headerEle></header>`,
      },
    });
    TestBed.configureTestingModule({ imports: [HeaderComponent] });

    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(() => component.ngOnInit()).not.toThrow();
    await fixture.whenStable();
  });
});
