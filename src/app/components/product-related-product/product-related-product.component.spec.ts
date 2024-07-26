import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRelatedProductComponent } from './product-related-product.component';

describe('ProductRelatedProductComponent', () => {
  let component: ProductRelatedProductComponent;
  let fixture: ComponentFixture<ProductRelatedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRelatedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRelatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
