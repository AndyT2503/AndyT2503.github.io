import { TestBed } from '@angular/core/testing';

import { EmailComponent } from './email.component';

describe('EmailComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(EmailComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [EmailComponent] });
    const fixture = TestBed.createComponent(EmailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
