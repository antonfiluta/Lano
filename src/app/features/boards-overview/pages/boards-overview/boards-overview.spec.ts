import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsOverview } from './boards-overview';

describe('BoardsOverview', () => {
  let component: BoardsOverview;
  let fixture: ComponentFixture<BoardsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
