import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  //define variables for containing results and writing values
  inputAmount: number | null = null;
  inputCurrency: string = 'USD';
  outputAmount: number | null = null;
  outputCurrency: string = 'EUR';

  exchangeRates: { [key: string]: number } = {};

  constructor(private currencyService: CurrencyService) {}

  //method for getting values from input
  ngOnInit() {
    this.currencyService.getCurrencyRates().subscribe((data: any) => {
      if (data && data.rates) {
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

    this.inputAmount = this.convert(
      this.outputAmount,
      this.outputCurrency,
      this.inputCurrency
    );
  }

  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const fromRate = this.exchangeRates[fromCurrency];
    const toRate = this.exchangeRates[toCurrency];

    if (fromRate && toRate) {
      return (amount / fromRate) * toRate;
    }

    return amount;
  }
}
