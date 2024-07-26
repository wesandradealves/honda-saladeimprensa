import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFileSizeComponent } from './modal-file-size.component';

describe('ModalFileSizeComponent', () => {
  let component: ModalFileSizeComponent;
  let fixture: ComponentFixture<ModalFileSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFileSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFileSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
