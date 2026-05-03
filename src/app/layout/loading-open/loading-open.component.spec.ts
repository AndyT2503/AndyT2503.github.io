import { TestBed } from '@angular/core/testing';

import { LoadingOpenComponent } from './loading-open.component';

describe('LoadingOpenComponent', () => {
  it('creates the component', () => {
    TestBed.overrideComponent(LoadingOpenComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [LoadingOpenComponent] });
    const fixture = TestBed.createComponent(LoadingOpenComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
