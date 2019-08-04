import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';
import { IncidentService } from '../incident/incident.service';
import { Incident } from '../incident/incident.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;
  incidents: Incident[];

  constructor(private userService: UserService, private incidentService: IncidentService) { }

  ngOnInit() {
    this.user = this.userService.getUserDetails();
    this.incidentService.getAllIncidents().subscribe(incidents => this.incidents = incidents);
  }

}
