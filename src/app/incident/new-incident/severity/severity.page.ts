import { Component, OnInit } from '@angular/core';

import { IncidentService } from '../../incident.service';
import { Severity } from '../../incident.model';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.page.html',
  styleUrls: ['./severity.page.scss'],
})
export class SeverityPage implements OnInit {
  selectedServerity: Severity;

  severities: Severity[];
  groupedSeverities: any;

  state: any;

  constructor(private incidentService: IncidentService,
              private route: ActivatedRoute,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
    this.severities = this.incidentService.getAllSeverities();
    this.groupedSeverities = [];
    for (let i = 0; i < this.severities.length; i += 2) {
      this.groupedSeverities.push({items: this.severities.slice(i, i + 2)});
    }

    this.route.queryParams.subscribe(params => {
      console.log (this.router.routerState);
      this.state = this.router.getCurrentNavigation().extras.state;
      if (!this.state) {
        this.router.navigate(['/']);
      }
    });
  }

  async selectSeverityAlert() {
    const alert = await this.alertController.create({
      header: 'No Severity Selected',
      message: 'Please select severity before continuing',
      buttons: ['Okay']
    });

    await alert.present();
  }

  next() {
    if (!this.selectedServerity) {
      this.selectSeverityAlert();
      return;
    }

    const extra: NavigationExtras = {
      state: {
        ...this.state , severity: this.selectedServerity
      }
    };

    this.router.navigate(['confirm-incident'], extra);
  }

}
