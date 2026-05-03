import { TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(LogoComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [LogoComponent] });
    const fixture = TestBed.createComponent(LogoComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
