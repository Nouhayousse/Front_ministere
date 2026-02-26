import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidaturesComponent } from './candidatures.component';
import { RouterOutlet } from '@angular/router';

describe('CandidaturesComponent', () => {
  let component: CandidaturesComponent;
  let fixture: ComponentFixture<CandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidaturesComponent, RouterOutlet]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

