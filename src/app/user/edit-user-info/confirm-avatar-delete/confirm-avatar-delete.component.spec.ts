import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAvatarDeleteComponent } from './confirm-avatar-delete.component';

describe('ConfirmAvatarDeleteComponent', () => {
  let component: ConfirmAvatarDeleteComponent;
  let fixture: ComponentFixture<ConfirmAvatarDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAvatarDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAvatarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
