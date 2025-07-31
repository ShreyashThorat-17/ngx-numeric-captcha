import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNumericCaptcha } from './ngx-numeric-captcha';

describe('NgxNumericCaptcha', () => {
  let component: NgxNumericCaptcha;
  let fixture: ComponentFixture<NgxNumericCaptcha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxNumericCaptcha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxNumericCaptcha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
