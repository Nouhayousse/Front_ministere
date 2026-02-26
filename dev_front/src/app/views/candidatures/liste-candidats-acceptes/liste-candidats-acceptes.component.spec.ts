import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCandidatsAcceptesComponent } from './liste-candidats-acceptes.component';


describe('ListeCandidatsAcceptesComponent', () => {
  let component: ListeCandidatsAcceptesComponent;
  let fixture: ComponentFixture<ListeCandidatsAcceptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCandidatsAcceptesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCandidatsAcceptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
