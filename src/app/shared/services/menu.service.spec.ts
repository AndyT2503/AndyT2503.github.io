import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  it('emits the latest selected menu', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(MenuService);

    const values: string[] = [];
    const subscription = service.getCurrentMenuSelected().subscribe((v) => values.push(v));

    service.updateCurrentMenuSelected('Blog');

    expect(values.at(-1)).toBe('Blog');
    subscription.unsubscribe();
  });
});

