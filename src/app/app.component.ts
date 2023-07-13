import { Component, OnInit } from '@angular/core';
import { CurrencyService, CurrencyResponse } from './currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  usdRate: number | undefined;
  eurRate: number | undefined;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    // Fetch currency rates on component initialization
    this.currencyService
      .getCurrencyRates()
      .subscribe((data: CurrencyResponse) => {
        // Extract UAH rate from the response
        const uahRate = data.rates['UAH'];
        // Calculate USD rate based on UAH rate
        this.usdRate = uahRate;
        // Calculate EUR rate based on UAH rate and EUR rate
        this.eurRate = uahRate / data.rates['EUR'];
      });
  }
}
