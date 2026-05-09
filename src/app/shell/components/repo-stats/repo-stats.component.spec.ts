import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoStatsComponent } from './repo-stats.component';

describe('RepoStatsComponent', () => {
  let component: RepoStatsComponent;
  let fixture: ComponentFixture<RepoStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoStatsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
