import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingSocialMediaComponent } from './racing-social-media.component';

describe('RacingSocialMediaComponent', () => {
  let component: RacingSocialMediaComponent;
  let fixture: ComponentFixture<RacingSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacingSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
