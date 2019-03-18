import { Component, NgZone, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {Events, NavController, AlertController, ModalController} from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  io:any;
  public dir;
  public play = false;
  public movemnt;
  public musicEnabled = false;
  public sleepMonitor = "SLEEP MONITOR OFF";
  public alert =false;
  public active=false;
  public alertMethodHome = "both";
  babyInformation = {
    name:"Yili Chen",
    age:"18 Month",
    gender:"Female",
    weight:"22.3 Pounds"

  };



  constructor(public navCtrl: NavController, private ngZone: NgZone, public events: Events, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    // this.io = io('http://localhost:3000');
    //this.io = io('192.168.1.73:3000');
    this.io = io('192.168.0.114:3000');
  }
  goTosettingPage(){
    this.navCtrl.push('TempPage');
  }
  playMusic(){
    this.play = true;
    this.io.emit('playornot', this.play);
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Attention!',
      subTitle: 'Yili might be falling from the bed! Go check on her as soon as possible!',
      buttons: ['OK']
    });
    alert.present();
  }
  showTooActive() {
    const alert = this.alertCtrl.create({
      subTitle: 'Yili might be too active to fall asleep. Play some music.',
      buttons: ['OK']
    });
    alert.present();
  }
  editBabyForm(){
    let babyForm = this.alertCtrl.create({
      title:"Yili's Information",
      message:"Name",
      inputs:[
        {
          label:'Name',
          name:'babyName',
          value:'Yili Chen'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    babyForm.present();
  }
  public openBabyForm(){
    // var data = {message: 'Hello'};
    var babyForm = this.modalCtrl.create('BabyInforPage');
    babyForm.onDidDismiss(data => {
      console.log(data);
      this.babyInformation.name = data.name;
      this.babyInformation.age = data.age;
    });
    babyForm.present();
  }

  ngOnInit() {

    this.ngZone.runOutsideAngular( () => {
      this.events.subscribe('user:sleep_monitor_receive', (state) => {
        this.musicEnabled = state;
        if(this.musicEnabled){
          this.sleepMonitor="SLEEP MONITOR ON";
        }
      });
      this.events.subscribe('send_alter_method',(alterData) => {
        this.alertMethodHome = alterData;
        console.log(this.alertMethodHome);
      });
      this.io.on('event:accelerometer', (val1, val2, val3, val4, val5, val6) => {
        this.ngZone.run( () => {

          this.movemnt = val4;
          this.alert = val5;
          this.active = val6;
          console.log(this.active);
          // if(this.musicEnabled){
          //   setInterval(()=> { console.log("Hello"); }, 3000);
          // }
          if(this.alert){
            if(this.alertMethodHome == "both"){
              this.showAlert();
              console.log("alert");
            }else if(this.alertMethodHome == "appAlert"){
              this.showAlert();
            }
          }
          if(this.active){
            if(this.musicEnabled){
              this.showTooActive();
            }
          }
          this.lineChartData = [
            {data: val1.split(','), label: 'Acceleration'},
            {data: val2.split(','), label: 'Roll Angle'},
            {data: val3.split(','), label: 'Z Axis'}
          ];
        });
      });
    });
  }



  public lineChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Acceleration'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Roll Angle'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Z Axis'}
  ];
  public lineChartLabels:Array<any> = ['1', '2', '3',
    '4', '5', '6', '7', "8", "9", "10"];
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
