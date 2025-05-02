import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductriceDashboardComponent } from './conductrice-dashboard.component';

describe('ConductriceDashboardComponent', () => {
  let component: ConductriceDashboardComponent;
  let fixture: ComponentFixture<ConductriceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductriceDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductriceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
