import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariesPageComponent } from './inventaries-page.component';

describe('InventariesPageComponent', () => {
  let component: InventariesPageComponent;
  let fixture: ComponentFixture<InventariesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventariesPageComponent]
    });
    fixture = TestBed.createComponent(InventariesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
