import { TestBed } from '@angular/core/testing';

import { BottomNavComponent } from './bottom-nav.component';
import { NavItem } from '../../shell.component';

describe('BottomNavComponent', () => {
  const navItems: NavItem[] = [
    { id: 'intro', label: 'Intro', icon: 'house' },
    { id: 'blog', label: 'Blog', icon: 'book-open' },
  ];

  it('renders nav items and emits the clicked section id', async () => {
    TestBed.configureTestingModule({ imports: [BottomNavComponent] });

    const fixture = TestBed.createComponent(BottomNavComponent);
    const emitted: string[] = [];
    fixture.componentRef.setInput('navItems', navItems);
    fixture.componentRef.setInput('activeSection', 'blog');
    fixture.componentInstance.onClickNavItem.subscribe((id) => emitted.push(id));
    await fixture.whenStable();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Intro');
    expect(buttons[1].classList.contains('is-active')).toBe(true);
    expect(emitted).toEqual(['intro']);
  });
});
