import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //define variables for containing results
  usdRate: number | undefined;
  eurRate: number | undefined;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    //calculate current
    this.currencyService.getCurrencyRates().subscribe((data: any) => {
      const uahRate = data.rates.UAH;
      this.usdRate = uahRate;
      this.eurRate = uahRate / data.rates.EUR;
    });
  }
}
