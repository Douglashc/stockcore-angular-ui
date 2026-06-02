import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementsPageComponent } from './stock-movements-page.component';

describe('StockMovementsPageComponent', () => {
  let component: StockMovementsPageComponent;
  let fixture: ComponentFixture<StockMovementsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockMovementsPageComponent]
    });
    fixture = TestBed.createComponent(StockMovementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
