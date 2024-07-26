import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelGalleryComponent } from './product-model-gallery.component';

describe('ProductModelGalleryComponent', () => {
  let component: ProductModelGalleryComponent;
  let fixture: ComponentFixture<ProductModelGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductModelGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModelGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
