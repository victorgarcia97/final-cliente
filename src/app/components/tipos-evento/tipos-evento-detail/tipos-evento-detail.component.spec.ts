import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEventoDetailComponent } from './tipos-evento-detail.component';

describe('TiposEventoDetailComponent', () => {
  let component: TiposEventoDetailComponent;
  let fixture: ComponentFixture<TiposEventoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposEventoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposEventoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
