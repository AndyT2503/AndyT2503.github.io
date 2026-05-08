import { TestBed } from '@angular/core/testing';

import { IntroComponent } from './intro.component';

describe('GeneralInfoComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(IntroComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [IntroComponent] });
    const fixture = TestBed.createComponent(IntroComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
