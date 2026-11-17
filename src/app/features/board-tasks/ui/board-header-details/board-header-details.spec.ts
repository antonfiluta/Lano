import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderDetails } from './board-header-details';

describe('BoardHeaderDetails', () => {
  let component: BoardHeaderDetails;
  let fixture: ComponentFixture<BoardHeaderDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardHeaderDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardHeaderDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
