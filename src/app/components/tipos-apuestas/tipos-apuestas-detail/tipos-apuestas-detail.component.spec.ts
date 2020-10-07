import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposApuestasDetailComponent } from './tipos-apuestas-detail.component';

describe('TiposApuestasDetailComponent', () => {
  let component: TiposApuestasDetailComponent;
  let fixture: ComponentFixture<TiposApuestasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposApuestasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposApuestasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
