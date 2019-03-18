import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatedUserPage } from './related-user';

@NgModule({
  declarations: [
    RelatedUserPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatedUserPage),
  ],
})
export class RelatedUserPageModule {}
