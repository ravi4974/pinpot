import { Component, OnInit } from '@angular/core';

import { IncidentService } from './incident.service';
import { Incident } from './incident.model';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss'],
})
export class IncidentPage implements OnInit {
  incidents: Incident[];

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.incidentService.getAllIncidents().subscribe((incidents: Incident[]) => {
      this.incidents = incidents;
    });
  }

}
