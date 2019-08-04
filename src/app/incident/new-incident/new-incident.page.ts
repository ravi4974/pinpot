import { Component, OnInit } from '@angular/core';

import { Incident, Address, Severity } from '../incident.model';
import { IncidentService } from '../incident.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.page.html',
  styleUrls: ['./new-incident.page.scss'],
})
export class NewIncidentPage implements OnInit {
  incident: Incident;
  state: any;

  constructor(private incidentService: IncidentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation().extras.state;
      if (!this.state) {
        this.router.navigate(['/']);
      }
      this.incident = {
        id: 'INC',
        address: this.state.address,
        image: this.state.imageData,
        severity: this.state.severity,
        location: this.state.location
      };
    });
    // this.incident = this.incidentService.getIncident('INC0023');
  }

  save() {
    this.incidentService.addIncident(this.incident);
    this.router.navigate(['/']);
  }

}
