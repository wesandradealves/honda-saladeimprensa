import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsroomMenuComponent } from './newsroom-menu.component';

describe('NewsroomMenuComponent', () => {
  let component: NewsroomMenuComponent;
  let fixture: ComponentFixture<NewsroomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsroomMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsroomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
