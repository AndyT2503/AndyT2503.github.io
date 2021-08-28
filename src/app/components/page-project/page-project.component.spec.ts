import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProjectComponent } from './page-project.component';

describe('PageProjectComponent', () => {
  let component: PageProjectComponent;
  let fixture: ComponentFixture<PageProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
