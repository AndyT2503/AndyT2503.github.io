import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SideNavComponent } from './side-nav.component';
import { NavItem } from '../../shell.component';

describe('SideNavComponent', () => {
  const navItems: NavItem[] = [
    { id: 'intro', label: 'Intro', icon: 'house' },
    { id: 'blog', label: 'Blog', icon: 'book-open' },
  ];

  it('renders nav and social links and emits the clicked section id', async () => {
    TestBed.configureTestingModule({
      imports: [SideNavComponent],
      providers: [provideRouter([])],
    });

    const fixture = TestBed.createComponent(SideNavComponent);
    const emitted: string[] = [];
    fixture.componentRef.setInput('navItems', navItems);
    fixture.componentRef.setInput('activeSection', 'intro');
    fixture.componentInstance.onClickNavItem.subscribe((id) => emitted.push(id));
    await fixture.whenStable();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('TU HOANG');
    expect(buttons[0].classList.contains('is-active')).toBe(true);
    expect(fixture.componentInstance.socials).toHaveLength(4);
    expect(emitted).toEqual(['blog']);
  });
});
