import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreContentsComponent } from './more-contents.component';

describe('MoreContentsComponent', () => {
  let component: MoreContentsComponent;
  let fixture: ComponentFixture<MoreContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
