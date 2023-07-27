import { Component, Output, EventEmitter } from '@angular/core';

interface OrderBy {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterCriteria = new EventEmitter<any>();
  minPrice: number = 0;
  maxPrice: number = 10000;
  productTitle: string = "";
  sliderValue: number = 0;
  orderBy: string = "asc";

  order: OrderBy[] = [
    { value: 'Aasc', viewValue: 'Alphabetically ascending' },
    { value: 'Adesc', viewValue: 'Alphabetically descending' },
    { value: 'Pasc', viewValue: 'Price ascending' },
    { value: 'Pdesc', viewValue: 'Price descending' },
  ];

  applyFilter() {
    const filterData = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      productTitle: this.productTitle,
      orderBy: this.orderBy,
      // Add more filtering criteria as needed
    };

    this.filterCriteria.emit(filterData);
  }
}

export class SliderFormattingExample {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
