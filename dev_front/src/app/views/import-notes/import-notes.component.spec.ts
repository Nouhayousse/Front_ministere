import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportNotesComponent } from './import-notes.component';

describe('ImportNotesComponent', () => {
  let component: ImportNotesComponent;
  let fixture: ComponentFixture<ImportNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
