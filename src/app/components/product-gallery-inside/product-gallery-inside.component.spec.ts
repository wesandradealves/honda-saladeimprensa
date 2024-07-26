import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGalleryInsideComponent } from './product-gallery-inside.component';

describe('ProductGalleryInsideComponent', () => {
  let component: ProductGalleryInsideComponent;
  let fixture: ComponentFixture<ProductGalleryInsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGalleryInsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGalleryInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
