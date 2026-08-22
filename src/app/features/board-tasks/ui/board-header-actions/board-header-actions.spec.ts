import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderActions } from './board-header-actions';

describe('BoardHeaderActions', () => {
  let component: BoardHeaderActions;
  let fixture: ComponentFixture<BoardHeaderActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardHeaderActions],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardHeaderActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
