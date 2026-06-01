import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersPageComponent } from './suppliers-page.component';

describe('SuppliersPageComponent', () => {
  let component: SuppliersPageComponent;
  let fixture: ComponentFixture<SuppliersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersPageComponent]
    });
    fixture = TestBed.createComponent(SuppliersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
