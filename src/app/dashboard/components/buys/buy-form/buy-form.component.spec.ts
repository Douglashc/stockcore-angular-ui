import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFormComponent } from './buy-form.component';

describe('BuyFormComponent', () => {
  let component: BuyFormComponent;
  let fixture: ComponentFixture<BuyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyFormComponent]
    });
    fixture = TestBed.createComponent(BuyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
