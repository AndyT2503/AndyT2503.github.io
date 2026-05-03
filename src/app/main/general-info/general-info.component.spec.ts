import { TestBed } from '@angular/core/testing';

import { GeneralInfoComponent } from './general-info.component';

describe('GeneralInfoComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(GeneralInfoComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [GeneralInfoComponent] });
    const fixture = TestBed.createComponent(GeneralInfoComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
