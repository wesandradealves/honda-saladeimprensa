import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HondaCorporativeComponent } from './honda-corporative.component';

describe('HondaCorporativeComponent', () => {
  let component: HondaCorporativeComponent;
  let fixture: ComponentFixture<HondaCorporativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HondaCorporativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HondaCorporativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
