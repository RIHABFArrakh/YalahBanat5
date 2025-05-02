import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVoyageComponent } from './book-voyage.component';

describe('BookVoyageComponent', () => {
  let component: BookVoyageComponent;
  let fixture: ComponentFixture<BookVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookVoyageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
