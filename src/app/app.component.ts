import { Component, OnInit } from '@angular/core';
import { CustomersService } from './services/customers.service';
import { CustomerPerService } from '../app/models/customerPerService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ChartProject';
  numOfUserPerService!: CustomerPerService[];
  // numOfUserPerCertainService!: number;
  numOfUserPerDate!: number;
  serviceName: string = 'vdsl';

  constructor(private _customerService: CustomersService) {}

  ngOnInit(): void {
    this.getNumOfUserPerEachService(this.serviceName);
  }

  getNumOfUserPerEachService(_serviceName: string) {
    this._customerService
      .GetAllCustomerCountPerEachService()
      .subscribe((res) => {
        this.numOfUserPerService = res;
        console.log('now res ', res);
      });
  }
}
