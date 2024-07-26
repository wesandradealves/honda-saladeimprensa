import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPowerModelComponent } from './product-power-model.component';

describe('ProductPowerModelComponent', () => {
  let component: ProductPowerModelComponent;
  let fixture: ComponentFixture<ProductPowerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPowerModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPowerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
