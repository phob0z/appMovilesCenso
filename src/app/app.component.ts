import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private geolocation: Geolocation,
  ) {
    this.getGeolocation();
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("Latitud:", resp.coords.latitude);
      console.log("Longitud:", resp.coords.longitude);

      
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    // });
  }
}

