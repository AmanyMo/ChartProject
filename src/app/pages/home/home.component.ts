import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartType, registerables } from 'chart.js';
import { CustomerPerService } from 'src/app/models/customerPerService';
import { CustomerPerYear } from 'src/app/models/customerPerYear';
import { CustomersService } from 'src/app/services/customers.service';

// const labels = Utils.months({count: 7});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('piechart') pieChart!: { nativeElement: any };
  @ViewChild('linechart') lineChart!: { nativeElement: any };
  ctx: any;
  canvas: any;
  ctx2: any;
  canvas2: any;
  // myPieChart!: Chart;
  serviceGroupCount!: CustomerPerService[];
  serviceNames!: string[];
  serviceCount!: number[];

  //dropdown
  myLineChart!: Chart;
  customerCountPerYear!: CustomerPerYear[];
  customerCountinMonthOfaYear: number[] = [];

  websiteList: any = [2009, 2008, 2000, 1998];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  form = new FormGroup({
    year: new FormControl('', Validators.required),
  });

  constructor(private _customerService: CustomersService) {
    Chart.register(...registerables);
  }
  async ngOnInit(): Promise<void> {
    await this._customerService
      .GetAllCustomerCountPerEachService()
      .subscribe((res) => {
        this.serviceGroupCount = res;
        this.serviceNames = this.serviceGroupCount.map((c) => c.serviceName);
        this.serviceCount = this.serviceGroupCount.map((c) => c.count);
        this.drawPieChart();
      });
  }

  drawPieChart() {
    this.canvas = this.pieChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart('piechart', {
      type: 'pie',
      data: {
        labels: [...this.serviceNames],
        datasets: [
          {
            label: 'Customer service in a pie chart',

            data: [...this.serviceCount],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(50,205,50)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
  drawlineChart() {
    // to avoid redraw at the same canvas
    let chartStatus = Chart.getChart('linechart');
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    this.canvas2 = this.lineChart.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');

    new Chart('linechart', {
      type: 'line',
      data: {
        labels: [
          'jan',
          'feb',
          'mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Customer count per month',
            data: [...this.customerCountinMonthOfaYear],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  } //drawlineChart

  get f() {
    return this.form.controls;
  }

  submit() {
    this.getCustomersPerYear(this.form.value.year);
  }
  changeYear(e: any) {
    console.log(e.target.value);
  }

  getCustomersPerYear(year: number) {
    this.customerCountinMonthOfaYear = [];
    this._customerService.GetAllCustomerPerYear(year).subscribe((data) => {
      this.customerCountPerYear = data;

      this.customerCountPerYear.forEach((el) => {
        this.customerCountinMonthOfaYear.push(el.count);
        console.log(this.customerCountinMonthOfaYear);
        
      });
    });
    this.drawlineChart();
  }
}
