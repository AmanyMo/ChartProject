import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';

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
  GetAllCustomerPerDate(month: number, year: number): Observable<number> {
    return this.http.get<number>(
      this.userUrl + '/getperdate?month=' + month + '&year=' + year
    );
  }
}
