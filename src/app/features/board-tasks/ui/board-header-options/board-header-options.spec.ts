import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderOptions } from './board-header-options';

describe('BoardHeaderOptions', () => {
  let component: BoardHeaderOptions;
  let fixture: ComponentFixture<BoardHeaderOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardHeaderOptions],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardHeaderOptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
