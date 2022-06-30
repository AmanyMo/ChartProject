import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  @Input() customerList: Customer[] = [];
  customerCollection: Customer[] = [];
  page = 1;
  pageSize = 20;
  collectionSize!: number;

  constructor() {}

  ngOnInit(): void {
    this.customerCollection = this.customerList;
    this.collectionSize = this.customerList.length;
    this.refreshCustomers();
  }
  refreshCustomers() {
    this.customerCollection = this.customerList
      .map((customer: Customer, i) => ({
        Id: i + 1,
        ...customer,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
