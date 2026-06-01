import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesPageComponent } from './lotes-page.component';

describe('LotesPageComponent', () => {
  let component: LotesPageComponent;
  let fixture: ComponentFixture<LotesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotesPageComponent]
    });
    fixture = TestBed.createComponent(LotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
