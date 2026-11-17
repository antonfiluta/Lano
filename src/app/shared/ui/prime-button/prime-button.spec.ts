import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeButton } from './prime-button';

describe('PrimeButton', () => {
  let component: PrimeButton;
  let fixture: ComponentFixture<PrimeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeButton],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimeButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
