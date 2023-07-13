import { Component, OnInit } from '@angular/core';
import { CurrencyService, CurrencyResponse } from '../currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
})
export class CurrencyConverterComponent implements OnInit {
  inputAmount: number | null = null;
  inputCurrency: string = 'USD';
  outputAmount: number | null = null;
  outputCurrency: string = 'EUR';

  exchangeRates: { [key: string]: number } = {};

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    // Fetch currency rates on component initialization
    this.currencyService
      .getCurrencyRates()
      .subscribe((data: CurrencyResponse) => {
        if (data && data.rates) {
          // Store exchange rates
          this.exchangeRates = data.rates;
          this.convertFromInput();
        }
      });
  }

  convertFromInput() {
    if (this.inputAmount === null) {
      this.outputAmount = null;
      return;
    }
    // Convert input amount to output currency
    this.outputAmount = this.convert(
      this.inputAmount,
      this.inputCurrency,
      this.outputCurrency
    );
  }

  convertFromOutput() {
    if (this.outputAmount === null) {
      this.inputAmount = null;
      return;
    }
    // Convert output amount to input currency
    this.inputAmount = this.convert(
      this.outputAmount,
      this.outputCurrency,
      this.inputCurrency
    );
  }

  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) {
      // No conversion needed if currencies are the same
      return amount;
    }

    const fromRate: number = this.exchangeRates[fromCurrency];
    const toRate: number = this.exchangeRates[toCurrency];

    if (fromRate && toRate) {
      // Convert amount from one currency to another
      const convertedAmount: number = (amount / fromRate) * toRate;
      return this.roundToDecimalPlaces(convertedAmount, 4);
    }

    return amount;
  }

  roundToDecimalPlaces(value: number, decimalPlaces: number): number {
    const factor: number = 10 ** decimalPlaces;
    // Round the value to the specified decimal places
    return Math.round(value * factor) / factor;
  }
}
