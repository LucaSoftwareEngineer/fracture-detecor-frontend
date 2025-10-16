import { TestBed } from '@angular/core/testing';

import { AnalisiFratturaService } from './analisi.frattura.service';

describe('AnalisiFratturaService', () => {
  let service: AnalisiFratturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisiFratturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
