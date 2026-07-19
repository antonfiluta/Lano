import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPage } from './initial-page';

describe('InitialPage', () => {
  let component: InitialPage;
  let fixture: ComponentFixture<InitialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
