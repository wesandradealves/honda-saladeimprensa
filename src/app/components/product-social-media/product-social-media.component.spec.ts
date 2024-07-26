import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSocialMediaComponent } from './product-social-media.component';

describe('ProductSocialMediaComponent', () => {
  let component: ProductSocialMediaComponent;
  let fixture: ComponentFixture<ProductSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
