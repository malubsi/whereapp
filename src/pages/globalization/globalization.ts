import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';
import * as moment from 'moment-timezone';

@Component({
  selector: 'page-globalization',
  templateUrl: 'globalization.html'
})
export class GlobalizationPage {

  public g11n: any;
  public setDate = moment();

  constructor(public navCtrl: NavController,
    private globalization: Globalization) {
      this.setDate.tz('Asia/Singapore').format('DD/MM/YYYY HH:mm');
  }

  ionViewCanEnter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.globalization.getDatePattern({ formatLength: 'full', selector: 'date and time' })
        .then(res => {
          this.g11n = res;
          this.setDate = this.setDate.tz('Asia/Singapore').format('DD/MM/YYYY HH:mm');
          console.log(this.g11n);
          console.log(this.setDate);
        })
        .catch(e => {
          console.log(e);
        });
      this.globalization.getPreferredLanguage()
        .then(res => {
          this.g11n.language = res.value;
        })
        .catch(e => {
          console.log(e);
        });
      this.globalization.getLocaleName()
        .then(res => {
          this.g11n.locale = res.value;
          return resolve(true);
        })
        .catch(e => {
          console.log(e);
          return reject(false);
        });
    })
  }
}
