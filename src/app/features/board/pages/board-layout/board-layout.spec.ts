import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLayout } from './board-layout';

describe('BoardLayout', () => {
  let component: BoardLayout;
  let fixture: ComponentFixture<BoardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
