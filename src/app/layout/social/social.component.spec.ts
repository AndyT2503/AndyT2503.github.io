import { TestBed } from '@angular/core/testing';

import { SocialComponent } from './social.component';

describe('SocialComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(SocialComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [SocialComponent] });
    const fixture = TestBed.createComponent(SocialComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
