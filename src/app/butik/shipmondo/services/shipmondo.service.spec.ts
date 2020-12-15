import { TestBed } from '@angular/core/testing';

import { ShipmondoService } from './shipmondo.service';

describe('ShipmondoService', () => {
  let service: ShipmondoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmondoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
