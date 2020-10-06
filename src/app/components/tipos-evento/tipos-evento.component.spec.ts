import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEventoComponent } from './tipos-evento.component';

describe('TiposEventosComponent', () => {
  let component: TiposEventoComponent;
  let fixture: ComponentFixture<TiposEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
