import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureViewComponent } from './candidature-view.component';

describe('CandidatureViewComponent', () => {
  let component: CandidatureViewComponent;
  let fixture: ComponentFixture<CandidatureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatureViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
