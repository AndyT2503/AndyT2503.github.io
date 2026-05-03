import { TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { SessionStorageService } from '../shared/services';
import { StorageKey } from '../shared/const';

describe('MainComponent', () => {
  it('shows main content immediately when already loaded', async () => {
    const storage = {
      getItem: vi.fn(() => true),
      setItem: vi.fn(),
    };

    TestBed.overrideComponent(MainComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{ provide: SessionStorageService, useValue: storage }],
    });

    const fixture = TestBed.createComponent(MainComponent);
    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(storage.getItem).toHaveBeenCalledWith(StorageKey.wasLoaded);
    expect(fixture.componentInstance.isOpen()).toBe(true);
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('enables the UI after the loading timeout when first visited', async () => {
    vi.useFakeTimers();
    const storage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    };

    TestBed.overrideComponent(MainComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{ provide: SessionStorageService, useValue: storage }],
    });

    const fixture = TestBed.createComponent(MainComponent);
    fixture.componentInstance.ngOnInit();

    expect(fixture.componentInstance.isOpen()).toBe(false);

    vi.advanceTimersByTime(4000);
    await fixture.whenStable();

    expect(fixture.componentInstance.isOpen()).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(StorageKey.wasLoaded, true);
    vi.useRealTimers();
  });
});
