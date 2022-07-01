import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../app/pages/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersService } from './services/customers.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './pages/customer/customer_list/customer-list/customer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    CustomerListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CustomersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
