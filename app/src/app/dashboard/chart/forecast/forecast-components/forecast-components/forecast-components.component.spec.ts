import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastComponentsComponent } from './forecast-components.component';

describe('ForecastComponentsComponent', () => {
  let component: ForecastComponentsComponent;
  let fixture: ComponentFixture<ForecastComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
