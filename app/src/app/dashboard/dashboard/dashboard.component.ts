import {Component, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {take, takeUntil} from "rxjs/operators";
import {MatAnchor, MatButton, MatButtonModule} from "@angular/material/button";
import {Lister} from "../../api/lister/Lister";

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
  private tickers: any[]= [];

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;
  protected _onDestroy = new Subject();
  constructor(private listerService: Lister) { }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnInit() {
    console.log("ngOnInit")
    this.listerService.get().subscribe((data) => {
      if(data) {
        console.log(data)
        this.tickers = data
      }
    });
    this.websiteCtrl.setValue(this.tickers[1]);
    this.filteredWebsites.next(this.tickers.slice());

    this.websiteFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
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
}
