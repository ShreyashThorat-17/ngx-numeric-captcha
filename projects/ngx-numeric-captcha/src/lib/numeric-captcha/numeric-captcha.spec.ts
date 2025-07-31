import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericCaptcha } from './numeric-captcha';

describe('NumericCaptcha', () => {
  let component: NumericCaptcha;
  let fixture: ComponentFixture<NumericCaptcha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericCaptcha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericCaptcha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
