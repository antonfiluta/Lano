import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderNav } from './board-header-nav';

describe('BoardHeaderNav', () => {
  let component: BoardHeaderNav;
  let fixture: ComponentFixture<BoardHeaderNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardHeaderNav],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardHeaderNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
