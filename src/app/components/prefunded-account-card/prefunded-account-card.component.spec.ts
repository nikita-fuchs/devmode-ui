import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefundedAccountCardComponent } from './prefunded-account-card.component';

describe('PrefundedAccountCardComponent', () => {
  let component: PrefundedAccountCardComponent;
  let fixture: ComponentFixture<PrefundedAccountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefundedAccountCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefundedAccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
