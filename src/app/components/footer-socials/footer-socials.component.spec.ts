import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSocialsComponent } from './footer-socials.component';

describe('FooterSocialsComponent', () => {
  let component: FooterSocialsComponent;
  let fixture: ComponentFixture<FooterSocialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSocialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
