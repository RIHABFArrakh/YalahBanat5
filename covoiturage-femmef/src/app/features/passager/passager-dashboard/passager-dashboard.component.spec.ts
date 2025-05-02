import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagerDashboardComponent } from './passager-dashboard.component';

describe('PassagerDashboardComponent', () => {
  let component: PassagerDashboardComponent;
  let fixture: ComponentFixture<PassagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassagerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
