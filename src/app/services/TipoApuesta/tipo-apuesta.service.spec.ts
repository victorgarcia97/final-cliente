import { TestBed } from '@angular/core/testing';

import { TipoApuestaService } from './tipo-apuesta.service';

describe('TipoApuestaService', () => {
  let service: TipoApuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoApuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
