import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogHeaderCardComponent } from './blog-header-card.component';

describe('BlogHeaderCardComponent', () => {
  let component: BlogHeaderCardComponent;
  let fixture: ComponentFixture<BlogHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogHeaderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogHeaderCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
