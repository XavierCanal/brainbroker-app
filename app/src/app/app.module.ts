import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { ChartComponent } from './dashboard/chart/chart/chart.component';
import { ForecastComponent } from './dashboard/chart/forecast/forecast/forecast.component';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { ForecastComponentsComponent } from './dashboard/chart/forecast/forecast-components/forecast-components/forecast-components.component';
import {NgOptimizedImage} from "@angular/common";
import { ForecastImageComponent } from './dashboard/chart/forecast/forecast-image/forecast-image/forecast-image.component';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    ForecastComponent,
    ForecastComponentsComponent,
    ForecastImageComponent,
    ForecastImageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        HttpClientModule,
        PlotlyModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
