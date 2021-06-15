import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleManagementComponent } from './ecole-management.component';

describe('EcoleManagementComponent', () => {
  let component: EcoleManagementComponent;
  let fixture: ComponentFixture<EcoleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcoleManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
