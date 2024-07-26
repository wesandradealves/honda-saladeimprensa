import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingSpiritComponent } from './racing-spirit.component';

describe('RacingSpiritComponent', () => {
  let component: RacingSpiritComponent;
  let fixture: ComponentFixture<RacingSpiritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacingSpiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingSpiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
