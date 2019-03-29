import { Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'account.html'
})
export class AccountPage {
  public state = false;
  public alertMethod: string = "both";

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
    // console.log(this.state);
  }
  alertMethodSend(){
    this.events.publish('send_alter_method', this.alertMethod);
  }

  goToRelatedUserPage(){
    this.navCtrl.push('RelatedUserPage');
  }
  goToSleepMonitorSettingPage(){
    this.navCtrl.push('SleepPage');
  }

}
