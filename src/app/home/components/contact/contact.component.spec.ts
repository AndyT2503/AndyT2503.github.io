import { TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  it('opens Messenger in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null as any);

    TestBed.overrideComponent(ContactComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [ContactComponent] });
    const fixture = TestBed.createComponent(ContactComponent);

    fixture.componentInstance.openMessenger();

    expect(openSpy).toHaveBeenCalledWith('http://m.me/AndyTu.Hoang/', '_blank');
    openSpy.mockRestore();
  });
});
