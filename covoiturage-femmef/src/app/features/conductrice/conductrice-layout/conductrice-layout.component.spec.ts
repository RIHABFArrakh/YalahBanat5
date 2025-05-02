import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductriceLayoutComponent } from './conductrice-layout.component';

describe('ConductriceLayoutComponent', () => {
  let component: ConductriceLayoutComponent;
  let fixture: ComponentFixture<ConductriceLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductriceLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductriceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
