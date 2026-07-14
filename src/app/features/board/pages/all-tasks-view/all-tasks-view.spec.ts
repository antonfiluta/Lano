import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksView } from './all-tasks-view';

describe('AllTasksView', () => {
  let component: AllTasksView;
  let fixture: ComponentFixture<AllTasksView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTasksView],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTasksView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
