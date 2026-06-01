import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSimpleCountComponent } from './card-simple-count.component';

describe('CardSimpleCountComponent', () => {
  let component: CardSimpleCountComponent;
  let fixture: ComponentFixture<CardSimpleCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSimpleCountComponent]
    });
    fixture = TestBed.createComponent(CardSimpleCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
