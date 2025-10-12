import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaAnalisiComponent } from './nuova-analisi.component';

describe('NuovaAnalisiComponent', () => {
  let component: NuovaAnalisiComponent;
  let fixture: ComponentFixture<NuovaAnalisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovaAnalisiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuovaAnalisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
