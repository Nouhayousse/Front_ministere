import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatTestComponent } from './candidat-test.component';

describe('CandidatTestComponent', () => {
  let component: CandidatTestComponent;
  let fixture: ComponentFixture<CandidatTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
