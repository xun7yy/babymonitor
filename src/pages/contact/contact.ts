import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController, App, MenuController,PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  constructor(public navCtrl: NavController, app: App, menu: MenuController, private popoverCtrl: PopoverController) {

  }
  // openPage() {
  //   this.navCtrl.push(friendsPage);
  // }
  presentPopover(ev) {


    let popover = this.popoverCtrl.create('PopoverPage', {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

}

