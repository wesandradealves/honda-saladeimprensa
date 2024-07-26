import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingMoreContentsComponent } from './racing-more-contents.component';

describe('RacingMoreContentsComponent', () => {
  let component: RacingMoreContentsComponent;
  let fixture: ComponentFixture<RacingMoreContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacingMoreContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingMoreContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
