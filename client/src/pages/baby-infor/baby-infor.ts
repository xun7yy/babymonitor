import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BabyInforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-baby-infor',
  templateUrl: 'baby-infor.html',
})
export class BabyInforPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }
  babyinf = {
    name:"Yili Chen",
    age:"18 Month",
    gender:"Female",
    weight:"22.3 Pounds"

  }
  save(){
    this.viewCtrl.dismiss(this.babyinf);
  }
  close(){
    this.viewCtrl.dismiss(this.babyinf);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BabyInforPage');
  }

}
