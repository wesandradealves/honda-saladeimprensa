import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCorpMenuComponent } from './modal-corp-menu.component';

describe('ModalCorpMenuComponent', () => {
  let component: ModalCorpMenuComponent;
  let fixture: ComponentFixture<ModalCorpMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCorpMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCorpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
