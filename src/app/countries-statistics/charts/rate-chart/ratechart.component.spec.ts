import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RateChartComponent } from './ratechart.component';


describe('RateChartComponent', () => {
  let component: RateChartComponent;
  let fixture: ComponentFixture<RateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ RateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
