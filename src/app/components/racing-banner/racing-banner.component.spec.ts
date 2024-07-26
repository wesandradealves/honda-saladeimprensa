import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingBannerComponent } from './racing-banner.component';

describe('RacingBannerComponent', () => {
  let component: RacingBannerComponent;
  let fixture: ComponentFixture<RacingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacingBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
