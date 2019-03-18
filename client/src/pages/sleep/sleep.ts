import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';


/**
 * Generated class for the SleepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sleep',
  templateUrl: 'sleep.html',
})
export class SleepPage {
  public state = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }
  public sleepTime = {
    timeStarts: '20:00',
    timeEnds: '06:30'
  }
  lullaby: string = "song1";
  lullabyTime: string = "five";

  sleepMonitorHandler( ) {
    this.state = !this.state;
    this.events.publish('user:sleep_monitor_receive', this.state);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SleepPage');
  }

}
