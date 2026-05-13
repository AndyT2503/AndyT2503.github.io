import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ShellComponent } from './shell.component';
import { MenuService } from '@shared/services/menu.service';

describe('ShellComponent', () => {
  it('scrolls to the selected section when already on the home page', async () => {
    const menuService = {
      activeSection: signal('intro').asReadonly(),
      scrollToSection: vi.fn(),
    };

    TestBed.overrideComponent(ShellComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [
        { provide: Router, useValue: { url: '/' } },
        { provide: MenuService, useValue: menuService },
      ],
    });
    await TestBed.compileComponents();

    const fixture = TestBed.createComponent(ShellComponent);
    fixture.componentInstance.clickNavItem('projects');
    await fixture.whenStable();

    expect(menuService.scrollToSection).toHaveBeenCalledWith('projects');
  });

  it('navigates home with a fragment when currently reading a blog post', async () => {
    const router = {
      url: '/blog/hello-world',
      navigate: vi.fn(() => Promise.resolve(true)),
    };
    const menuService = {
      activeSection: signal('blog').asReadonly(),
      scrollToSection: vi.fn(),
    };

    TestBed.overrideComponent(ShellComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: MenuService, useValue: menuService },
      ],
    });
    await TestBed.compileComponents();

    const fixture = TestBed.createComponent(ShellComponent);
    fixture.componentInstance.clickNavItem('contact');
    await fixture.whenStable();

    expect(router.navigate).toHaveBeenCalledWith(['/'], { fragment: 'contact' });
    expect(menuService.scrollToSection).not.toHaveBeenCalled();
  });
});
