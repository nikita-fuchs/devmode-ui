import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalanceListComponent } from './account-balance-list.component';

describe('AccountBalanceListComponent', () => {
  let component: AccountBalanceListComponent;
  let fixture: ComponentFixture<AccountBalanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBalanceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
