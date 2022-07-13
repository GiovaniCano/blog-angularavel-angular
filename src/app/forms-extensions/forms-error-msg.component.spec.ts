import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsErrorMsgComponent } from './forms-error-msg.component';

describe('FormsErrorMsgComponent', () => {
  let component: FormsErrorMsgComponent;
  let fixture: ComponentFixture<FormsErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsErrorMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
