import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoAnalisiComponent } from './storico-analisi.component';

describe('StoricoAnalisiComponent', () => {
  let component: StoricoAnalisiComponent;
  let fixture: ComponentFixture<StoricoAnalisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoricoAnalisiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoricoAnalisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
