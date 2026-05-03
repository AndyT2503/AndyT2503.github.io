import { TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(AboutComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [AboutComponent] });
    const fixture = TestBed.createComponent(AboutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
