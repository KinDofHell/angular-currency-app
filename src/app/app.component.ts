import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  usdRate: number | undefined;
  eurRate: number | undefined;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getCurrencyRates().subscribe((data: any) => {
      const uahRate = data.rates.UAH;
      this.usdRate = uahRate; // 1 USD is equivalent to UAH
      this.eurRate = uahRate / data.rates.EUR; // Calculate how much UAH is equivalent to 1 EUR
    });
  }
}
