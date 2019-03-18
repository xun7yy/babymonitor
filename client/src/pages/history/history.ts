import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'history.html'
})
export class HistoryPage {
  summary: string = "list";
  today: String = new Date().toISOString();
  constructor(public navCtrl: NavController) {}

  public lineChartData:Array<any> = [
    {data: [5, 3, 1, 2, 7, 1, 3, 1, 5, 2, 2, 1], label: 'Sleep'},
    {data: [1, 2, 1, 3, 0, 5, 2, 6, 1, 4, 3, 2], label: 'Active'},
    {data: [1, 2, 5, 2, 0, 6, 2, 0, 2, 1, 2, 4], label: 'Quiet'}
  ];
  public lineChartLabels:Array<any> = ['0AM', '2', '4',
    '6', '8', '10', '12PM', "2", "4", "6", "8", "10"];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(60, 179, 113,0.3)',
      borderColor: 'rgba(60, 179, 113, 0.8)',
      pointBackgroundColor: 'rgba(60, 179, 113, 1)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: 'rgba(60, 179, 113, 1)',
      pointHoverBorderColor: 'white'
    },
    { // dark grey
      backgroundColor: 'rgba(106, 90, 205,0.3)',
      borderColor: 'rgba(106, 90, 205,0.8)',
      pointBackgroundColor: 'rgba(106, 90, 205,1)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: 'rgba(106, 90, 205,1)',
      pointHoverBorderColor: 'white'
    },
    { // grey
      backgroundColor: 'rgba(255, 165, 0,0.3)',
      borderColor: 'rgba(255, 165, 0,0.8)',
      pointBackgroundColor: 'rgba(255, 165, 0,1)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: 'rgba(255, 165, 0,1)',
      pointHoverBorderColor: 'white)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



}
