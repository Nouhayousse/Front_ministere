import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCandidatureWizardComponent } from './ajout-candidature-wizard.component';

describe('AjoutCandidatureWizardComponent', () => {
  let component: AjoutCandidatureWizardComponent;
  let fixture: ComponentFixture<AjoutCandidatureWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutCandidatureWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutCandidatureWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
