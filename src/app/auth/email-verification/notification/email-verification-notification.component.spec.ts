import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationNotificationComponent } from './email-verification-notification.component';

describe('NotificationComponent', () => {
  let component: EmailVerificationNotificationComponent;
  let fixture: ComponentFixture<EmailVerificationNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerificationNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerificationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
