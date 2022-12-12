import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Router } from '@angular/router';
// import { Firestore, collection, addDoc } from "@angular/fire/firestore";

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public censoForm: FormGroup;

  @Input() latitude: number | undefined;
  @Input() longitude: number | undefined;
  @Input() user: any;

  constructor(
    private geolocation: Geolocation,
    public router: Router,
    public formBuilder: FormBuilder,
    // private firestore: Firestore,
  ) {
    this.getGeolocation();
    this.user = JSON.parse(localStorage.getItem('user')!).email;
    this.censoForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      datosPadre: ['', Validators.required],
      datosMadre: ['', Validators.required],
      latitud: [{ value: '', disabled: true }, Validators.required],
      longitud: [{ value: '', disabled: true }, Validators.required],
      registra: [{ value: '', disabled: true }, Validators.required],
    });
  }

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

  ngOnInit() {}

  guardarCenso() {
    const censo = {
      cedula: this.censoForm.value.cedula,
      nombres: this.censoForm.value.nombres,
      apellidos: this.censoForm.value.apellidos,
      celular: this.censoForm.value.celular,
      datosPadre: this.censoForm.value.datosPadre,
      datosMadre: this.censoForm.value.datosMadre,
      ubicacion: '(' + this.latitude + ',' + this.longitude + ')',
      registra: this.user,
    };
    if (!this.censoForm.valid) {
      window.alert('Por favor llena todos los campos!');
    } else {
      console.log("GUARDAR AQUÍ! el objeto censo");
      
      // this.afDB.object('censos').set(censo).then(() => {
      //     window.alert('Información guardada con exito!');
      //     this.router.navigate(['dashboard']);
      //   });
      // const censos = collection(this.firestore, 'censos');
      // addDoc(censos, censo);
    }
  }
}
