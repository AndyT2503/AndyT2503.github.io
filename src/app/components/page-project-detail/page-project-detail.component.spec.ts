import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProjectDetailComponent } from './page-project-detail.component';

describe('PageProjectDetailComponent', () => {
  let component: PageProjectDetailComponent;
  let fixture: ComponentFixture<PageProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProjectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
