import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleProductComponent } from './motorcycle-product.component';

describe('MotorcycleProductComponent', () => {
  let component: MotorcycleProductComponent;
  let fixture: ComponentFixture<MotorcycleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcycleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcycleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
