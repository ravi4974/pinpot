import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from '../incident.model';
import { IncidentService } from '../incident.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.scss'],
})
export class IncidentDetailPage implements OnInit {
  incident: Incident;

  constructor(private activateRoute: ActivatedRoute, private router: Router,
              private incidentService: IncidentService, private alertController: AlertController,
              private navController: NavController) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('incidentId')) {
        this.router.navigate(['/']);
        return;
      }
      const incidentId = paramMap.get('incidentId');

      this.incident = this.incidentService.getIncident(incidentId);
      if (!this.incident) {
        this.router.navigate(['/', 'tabs', 'incidents']);
        return;
      }
    });
  }

  edit() {

  }

  async confirmDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you want to delete the incident?',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.incidentService.deleteIncident(this.incident.id);
            this.router.navigate(['/', 'tabs', 'incidents']);
          }
        },
        'Cancel'
      ]
    });

    await alert.present();
  }

  delete() {
    this.confirmDeleteAlert();
  }

}
