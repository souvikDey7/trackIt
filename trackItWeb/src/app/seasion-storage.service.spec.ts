import { TestBed } from '@angular/core/testing';

import { SeasionStorageService } from './seasion-storage.service';

describe('SeasionStorageService', () => {
  let service: SeasionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
