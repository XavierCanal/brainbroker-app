import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {MatAnchor, MatButton, MatButtonModule} from "@angular/material/button";
import {Lister} from "../../api/lister/Lister";
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import {Chart} from "../../api/chart/Chart";
import {Stock} from "../../api/stock/stock";
import {DomSanitizer} from "@angular/platform-browser";
import {News} from "../news/news";
HC_stock(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app-material3';

  public websiteCtrl: FormControl = new FormControl();
  public websiteFilterCtrl: FormControl = new FormControl();
  public filteredWebsites: ReplaySubject<any> = new ReplaySubject(1);
  public tickers: string[]= [];
  public chartData?: any[][];
  public info?: {"end_date": string, "start_date": string, "ticker": string, "interval": string};

  public previousElement?: HTMLElement;
  public selectedTicker: string = "";
  public loadingChart: boolean = false;
  public fc_components: any;
  public cross_validation: any;
  public forecast_st: any;

  public news?: {status:string,totalResults:number,articles:[{source:{id:string,name:string},
      author:string,title:string,description:string,url:string,urlToImage:string,publishedAt:string,content:string}]};
  // articles_evaluation contain an array of {"value": 1, "conclusion": "text with conclusion"}
  public articles_evaluation?: [{ article: { value: number, conclusion: string } }];

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;
  protected _onDestroy = new Subject();
  public forecastData: any;
  constructor(
    private listerService: Lister,
    private chartService: Chart,
    private stockService: Stock,
    private newsService: News
  ) { }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnInit() {
    console.log("ngOnInit")
    this.listerService.get_symbols().subscribe((symbols) => {
      this.listerService.get_tickers().subscribe((data) => {
        if(data && symbols) {
          data = data.concat(symbols)
          this.tickers = data
          this.websiteCtrl.setValue(this.tickers[1]);
          this.filteredWebsites.next(this.tickers.slice());

          this.websiteFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterBanks();
            });
        }
      });
    });

  }

  selectChart(value: any) {
    this.chartData = undefined;
    this.forecastData = undefined;
    this.selectedTicker = value;
    this.chartService.get_candlestick(value).subscribe((data) => {
      if(data) {
           this.chartData = data.candlesticks.map((candlestick: { date: string | number | Date; open: any; high: any; low: any; close: any; }) => [
            new Date(candlestick.date).getTime(),
             parseFloat(candlestick.open),
             parseFloat(candlestick.high),
             parseFloat(candlestick.low),
             parseFloat(candlestick.close)
          ]);
           this.info = data.info
        }
    });
    this.newsService.get_actual_news(value).subscribe((data) => {
      if (data.result && data.evaluation) {
        console.log(data);
        this.news = JSON.parse(data.result);

        try {
          this.articles_evaluation = JSON.parse(data.evaluation);
          console.log(this.articles_evaluation)
          // @ts-ignore
          console.log(this.articles_evaluation[0])
        } catch (error) {
          console.log('Error parsing data.evaluation:', error);
        }
      }
    });

  }

  selectChartForecast() {
    this.loadingChart = true;
    this.chartService.get_forecast_with_news(this.selectedTicker).subscribe((data) => {
      this.forecastData = JSON.parse(data.fig)
      this.loadingChart = false;
    });
  }

  getForecastComponents() {
    this.loadingChart = true;
    this.chartService.get_forecast_components(this.selectedTicker).subscribe((data) => {
      this.fc_components = data
      this.loadingChart = false;
    })
  }

  getCrossValidation() {
    this.loadingChart = true;
    this.chartService.get_cross_validation(this.selectedTicker).subscribe((data) => {
      this.cross_validation = data
      this.loadingChart = false;
    })
  }

  getStandardForecast() {
    this.loadingChart = true;
    this.chartService.get_standard_forecast(this.selectedTicker).subscribe((data) => {
      this.forecast_st = data
      this.loadingChart = false;
    })
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngAfterViewInit() {
    this.setInitialValue();
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  protected setInitialValue() {
    this.filteredWebsites
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // @ts-ignore
        this.singleSelect.compareWith = (a: Website, b: Website) => a && b && a.id === b.id;
      });
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  protected filterBanks() {
    if (!this.tickers) {
      return;
    }

    let search = this.websiteFilterCtrl.value;
    if (!search) {
      this.filteredWebsites.next(this.tickers.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredWebsites.next(
      this.tickers.filter(bank => bank.toLowerCase().indexOf(search) > -1)
    );
  }

  updateSelectedIndex(elem: HTMLElement) {
    if(this.previousElement) {
      this.previousElement.className = "nav__menu flex flex-align-center"
    }
    elem.className = "nav__menu active flex flex-align-center"
    this.previousElement = elem;
  }

  updateTicker() {
    if(this.selectedTicker) {
      this.stockService.aggregate(this.selectedTicker).subscribe((data) => {
        if(data) {
          this.selectChart(this.selectedTicker);
        }
      });
    }
  }
}
