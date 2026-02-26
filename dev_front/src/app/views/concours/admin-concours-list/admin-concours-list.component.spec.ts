import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConcoursListComponent } from './admin-concours-list.component';

describe('AdminConcoursListComponent', () => {
  let component: AdminConcoursListComponent;
  let fixture: ComponentFixture<AdminConcoursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConcoursListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConcoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
