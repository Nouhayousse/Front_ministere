import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidaturesComponent } from './list-candidatures.component';

describe('ListCandidaturesComponent', () => {
  let component: ListCandidaturesComponent;
  let fixture: ComponentFixture<ListCandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCandidaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});