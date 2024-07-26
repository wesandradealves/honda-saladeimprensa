import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerProductComponent } from './power-product.component';

describe('PowerProductComponent', () => {
  let component: PowerProductComponent;
  let fixture: ComponentFixture<PowerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
