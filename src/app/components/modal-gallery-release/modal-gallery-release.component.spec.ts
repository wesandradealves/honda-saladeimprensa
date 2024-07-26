import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGalleryReleaseComponent } from './modal-gallery-release.component';

describe('ModalGalleryReleaseComponent', () => {
  let component: ModalGalleryReleaseComponent;
  let fixture: ComponentFixture<ModalGalleryReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGalleryReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGalleryReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
