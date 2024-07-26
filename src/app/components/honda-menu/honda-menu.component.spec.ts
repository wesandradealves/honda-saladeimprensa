import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HondaMenuComponent } from './honda-menu.component';

describe('HondaMenuComponent', () => {
  let component: HondaMenuComponent;
  let fixture: ComponentFixture<HondaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HondaMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HondaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
