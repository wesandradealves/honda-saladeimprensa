import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRelatedContentComponent } from './product-related-content.component';

describe('ProductRelatedContentComponent', () => {
  let component: ProductRelatedContentComponent;
  let fixture: ComponentFixture<ProductRelatedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRelatedContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRelatedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
