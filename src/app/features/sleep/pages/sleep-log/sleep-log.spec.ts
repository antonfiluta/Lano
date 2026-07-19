import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLog } from './sleep-log';

describe('SleepLog', () => {
  let component: SleepLog;
  let fixture: ComponentFixture<SleepLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLog],
    }).compileComponents();

    fixture = TestBed.createComponent(SleepLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
