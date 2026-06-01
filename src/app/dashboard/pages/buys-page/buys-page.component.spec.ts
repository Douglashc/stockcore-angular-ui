import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysPageComponent } from './buys-page.component';

describe('BuysPageComponent', () => {
  let component: BuysPageComponent;
  let fixture: ComponentFixture<BuysPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuysPageComponent]
    });
    fixture = TestBed.createComponent(BuysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
