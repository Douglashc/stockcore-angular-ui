import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementFormComponent } from './stock-movement-form.component';

describe('StockMovementFormComponent', () => {
  let component: StockMovementFormComponent;
  let fixture: ComponentFixture<StockMovementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockMovementFormComponent]
    });
    fixture = TestBed.createComponent(StockMovementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
