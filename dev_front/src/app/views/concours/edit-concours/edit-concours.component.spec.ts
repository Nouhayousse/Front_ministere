import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConcoursComponent } from './edit-concours.component';

describe('EditConcoursComponent', () => {
  let component: EditConcoursComponent;
  let fixture: ComponentFixture<EditConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
