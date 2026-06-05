import { TestBed } from '@angular/core/testing';

import { ProfileRepository } from './profile.repository';

describe('ProfileRepository', () => {
  let service: ProfileRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
