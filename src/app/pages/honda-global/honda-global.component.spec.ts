import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HondaGlobalComponent } from './honda-global.component';

describe('HondaGlobalComponent', () => {
  let component: HondaGlobalComponent;
  let fixture: ComponentFixture<HondaGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HondaGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HondaGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
