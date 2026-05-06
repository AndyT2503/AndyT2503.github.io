import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalProjectCardComponent } from './normal-project-card.component';

describe('NormalProjectCardComponent', () => {
  let component: NormalProjectCardComponent;
  let fixture: ComponentFixture<NormalProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NormalProjectCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
