import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the TempPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temp',
  templateUrl: 'temp.html',
})
export class TempPage {

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
