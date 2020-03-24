import { TestBed } from '@angular/core/testing';

import { ConsommationService } from './consommation.service';

describe('ConsommationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsommationService = TestBed.get(ConsommationService);
    expect(service).toBeTruthy();
  });
});
