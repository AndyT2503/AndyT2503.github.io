import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProjectListComponent } from './page-project-list.component';

describe('PageProjectListComponent', () => {
  let component: PageProjectListComponent;
  let fixture: ComponentFixture<PageProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
