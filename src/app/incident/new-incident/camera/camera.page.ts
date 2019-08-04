import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IncidentService } from '../../incident.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  imageData: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private alertController: AlertController, private camera: Camera,
              private incidentService: IncidentService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('incidentId')) {
        const incidentId = paramMap.get('incidentId');

        this.imageData = this.incidentService.getIncident(incidentId).image;
      } else {
        this.takePicture();
      }
    });
  }

  async cameraErrorAlert(err) {
    const alert = await this.alertController.create({
      header: 'Issue with camera',
      message: 'Unable to take picture. Error ' + err,
      buttons: [{text: 'Okay', handler: () => this.router.navigate(['/'])}]
    });

    await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((data) => {
      this.imageData = 'data:image/jpeg;base64,' + data;
    }, (err) => {
      // this.imageData=' ';
      this.cameraErrorAlert(err);
    });
  }

  async invalidImageAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Image',
      message: 'Please capture image to continue.',
      buttons: ['Okay']
    });

    await alert.present();
  }


  next() {
    if (!this.imageData) {
      this.invalidImageAlert();
      return;
    }

    const extra: NavigationExtras = {
      state: {
        imageData: this.imageData
      }
    };

    this.router.navigate(['address'], extra);
  }

}
