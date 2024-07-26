import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAutomobileComponent } from './product-automobile.component';

describe('ProductAutomobileComponent', () => {
  let component: ProductAutomobileComponent;
  let fixture: ComponentFixture<ProductAutomobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAutomobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
