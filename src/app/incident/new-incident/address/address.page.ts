import { Component, OnInit } from '@angular/core';
import { Address, Location } from '../../incident.model';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { IncidentService } from '../../incident.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  address: Address = {
    road: '',
    area: '',
    landmark: '',
    city: ''
  };
  state: any;
  location: Location = {
    latitude: null,
    longitude: null
  };

  constructor(private router: Router, private route: ActivatedRoute,
              private alertController: AlertController, private geolocation: Geolocation,
              private incidentService: IncidentService) {
    this.route.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation().extras.state;
      if (!this.state) {
        this.router.navigate(['/']);
      }
    });
   }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    });
  }

  async invalidAddressAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Address',
      message: 'Please enter correct address, all fields are required.',
      buttons: ['Okay']
    });

    await alert.present();
  }

  next() {
    if (this.address.area === '' ||
        this.address.city === '' ||
        this.address.landmark === '' ||
        this.address.road === '') {
      this.invalidAddressAlert();
      return;
    }
    const extra: NavigationExtras = {
      state: {
        ...this.state , address: this.address, location: this.location
      }
    };

    this.router.navigate(['severity'], extra);
  }

}
