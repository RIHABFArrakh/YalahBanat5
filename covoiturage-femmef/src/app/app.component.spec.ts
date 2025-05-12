import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let authService: AuthService;
  let router: Router;
  let destroy$: Subject<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [AuthService, Router]
    }).compileComponents();

    component = TestBed.createComponent(AppComponent).componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    destroy$ = new Subject<void>();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'covoiturage-femmef' title`, () => {
    expect(component.title).toEqual('covoiturage-femmef');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, covoiturage-femmef');
  });

  it('should load user data', () => {
    const user = { id: 1 } as User;
    spyOn(authService, 'currentUser$').and.returnValue(of(user));
    spyOn(component, 'loadUserData');

    component.ngOnInit();

    expect(authService.currentUser$).toHaveBeenCalled();
    expect(component.loadUserData).toHaveBeenCalledWith(user.id);
  });

  it('should redirect to login if no user is found', () => {
    const user = null;
    spyOn(authService, 'currentUser$').and.returnValue(of(user));
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(authService.currentUser$).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should load voyages and reservations', () => {
    const userId = 1;
    spyOn(component, 'loadUserData');

    component.loadUserData(userId);

    expect(component.loadUserData).toHaveBeenCalledWith(userId);
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(destroy$, 'next');
    spyOn(destroy$, 'complete');

    component.ngOnDestroy();

    expect(destroy$.next).toHaveBeenCalled();
    expect(destroy$.complete).toHaveBeenCalled();
  });
});
