import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsLog } from './habits-log';

describe('HabitsLog', () => {
  let component: HabitsLog;
  let fixture: ComponentFixture<HabitsLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsLog],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
