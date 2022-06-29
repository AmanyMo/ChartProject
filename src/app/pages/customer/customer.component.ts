import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';

const Customers: Customer[] = [
  {
    Id: 1,
    CustomerName: 'Russia',
    Service: 'f/f3/Flag_of_Russia.svg',
    ContractDate: new Date(1997, 4, 2),
    ContractExpiryDate: new Date(),
  },
  {
    Id: 2,
    CustomerName: 'France',
    Service: 'c/c3/Flag_of_France.svg',
    ContractDate: new Date(2007, 4, 2),
    ContractExpiryDate: new Date('4-4-20'),
  },
  {
    Id: 1,
    CustomerName: 'Russia',
    Service: 'f/f3/Flag_of_Russia.svg',
    ContractDate: new Date(1997, 4, 2),
    ContractExpiryDate: new Date(),
  },
  {
    Id: 2,
    CustomerName: 'France',
    Service: 'c/c3/Flag_of_France.svg',
    ContractDate: new Date(2007, 4, 2),
    ContractExpiryDate: new Date('4-4-20'),
  },
  {
    Id: 1,
    CustomerName: 'Russia',
    Service: 'f/f3/Flag_of_Russia.svg',
    ContractDate: new Date(1997, 4, 2),
    ContractExpiryDate: new Date(),
  },
  {
    Id: 2,
    CustomerName: 'France',
    Service: 'c/c3/Flag_of_France.svg',
    ContractDate: new Date(2007, 4, 2),
    ContractExpiryDate: new Date('4-4-20'),
  },
  {
    Id: 1,
    CustomerName: 'Russia',
    Service: 'f/f3/Flag_of_Russia.svg',
    ContractDate: new Date(1997, 4, 2),
    ContractExpiryDate: new Date(),
  },
  {
    Id: 2,
    CustomerName: 'France',
    Service: 'c/c3/Flag_of_France.svg',
    ContractDate: new Date(2007, 4, 2),
    ContractExpiryDate: new Date('4-4-20'),
  },
  {
    Id: 1,
    CustomerName: 'Russia',
    Service: 'f/f3/Flag_of_Russia.svg',
    ContractDate: new Date(1997, 4, 2),
    ContractExpiryDate: new Date(),
  },
];

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  page = 1;
  pageSize = 10;
  customers!: Customer[];
  collectionSize!: number;

  constructor(private _customerService: CustomersService) {
    this.GetAllCustomers();
    this.refreshCustomers();
  }

  ngOnInit(): void {

  }

  async GetAllCustomers() {
    console.log('customer after 1 ');
    this._customerService.GetAll().subscribe((data) => {
      console.log(data);
      this.customers = data;
      this.collectionSize = this.customers.length;
      console.log('cc', this.customers);
      console.log(this.customers[5].CustomerName);
    });
  }

  refreshCustomers() {
    console.log('reresh');
    this.customers = Customers.map((customer: Customer, i) => ({
      id: i + 1,
      ...customer,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
}
