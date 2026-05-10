import { TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  it('exposes contact email and social links', async () => {
    TestBed.overrideComponent(ContactComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [ContactComponent] });

    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.email).toBe('htu25399@gmail.com');
    expect(fixture.componentInstance.socialLinks.map((link) => link.label)).toEqual([
      'GitHub',
      'LinkedIn',
      'Instagram',
      'Facebook',
    ]);
  });
});
