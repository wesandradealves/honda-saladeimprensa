import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastReleasesComponent } from './last-releases.component';

describe('LastReleasesComponent', () => {
  let component: LastReleasesComponent;
  let fixture: ComponentFixture<LastReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastReleasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
