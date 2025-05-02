import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConductriceComponent } from './register-conductrice.component';

describe('RegisterConductriceComponent', () => {
  let component: RegisterConductriceComponent;
  let fixture: ComponentFixture<RegisterConductriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterConductriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterConductriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
