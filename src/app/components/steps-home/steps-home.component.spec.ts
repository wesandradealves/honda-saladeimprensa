import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsHomeComponent } from './steps-home.component';

describe('StepsHomeComponent', () => {
  let component: StepsHomeComponent;
  let fixture: ComponentFixture<StepsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
