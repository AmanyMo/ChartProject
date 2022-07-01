import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';
import { CustomerPerService } from '../models/customerPerService';
import { CustomerPerYear } from '../models/customerPerYear';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  userUrl = 'https://localhost:7002/api/Customer';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.userUrl);
  }
  GetAllCustomerExpired(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.userUrl + '/expired');
  }
  GetAllCustomerWillExpire(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.userUrl + '/willExpired');
  }
  GetAllCustomerCountPerservice(service: string): Observable<number> {
    return this.http.get<number>(
      this.userUrl + '/countperservice?service=' + service
    );
  }
  GetAllCustomerCountPerEachService():Observable<CustomerPerService[]>{
    return this.http.get<CustomerPerService[]>(this.userUrl+'/countpereachservice');
  }

  GetAllCustomerPerDate(month: number, year: number): Observable<number> {
    return this.http.get<number>(
      this.userUrl + '/getperdate?month=' + month + '&year=' + year
    );
  }
  GetAllCustomerPerYear(year:number):Observable<CustomerPerYear[]>{
    return this.http.get<CustomerPerYear[]>(this.userUrl+'/getperyear?year='+year);

  }
}
