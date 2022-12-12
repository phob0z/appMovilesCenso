import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  constructor(
    private geolocation: Geolocation,
    public authService: AuthenticationService
  ) {
    this.getGeolocation();
    this.user = JSON.parse(localStorage.getItem('user')!).email;
  }

  @Input() latitude;
  @Input() longitude;
  @Input() user;

  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  ngOnInit() {
  }

}
