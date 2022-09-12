import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingProjectsListComponent } from './existing-projects-list.component';

describe('ExistingProjectsListComponent', () => {
  let component: ExistingProjectsListComponent;
  let fixture: ComponentFixture<ExistingProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingProjectsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
