import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  collectionSize!: number;

  constructor(private _customerService: CustomersService) {}

  ngOnInit(): void {
    this.GetAllCustomers();
  }

  async GetAllCustomers() {
    await this._customerService.GetAll().subscribe((data) => {
      this.customers = data;
      this.collectionSize = this.customers.length;
    });
  }
}
