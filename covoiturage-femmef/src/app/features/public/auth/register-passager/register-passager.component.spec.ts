import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPassagerComponent } from './register-passager.component';

describe('RegisterPassagerComponent', () => {
  let component: RegisterPassagerComponent;
  let fixture: ComponentFixture<RegisterPassagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPassagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPassagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
