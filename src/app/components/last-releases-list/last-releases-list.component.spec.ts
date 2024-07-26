import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastReleasesListComponent } from './last-releases-list.component';

describe('LastReleasesListComponent', () => {
  let component: LastReleasesListComponent;
  let fixture: ComponentFixture<LastReleasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastReleasesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastReleasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
