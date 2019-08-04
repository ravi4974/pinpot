import { Injectable } from '@angular/core';

import { Incident, Address, Severity } from './incident.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private severties: Severity[] = [
    {
      code: 0,
      text: 'Distortion',
      imageUrl: '/assets/images/severity/distortion.png'
    },
    {
      code: 1,
      text: 'Pothole',
      imageUrl: '/assets/images/severity/pothole.png'
    },
    {
      code: 2,
      text: 'Cracking',
      imageUrl: '/assets/images/severity/cracking.png'
    },
    {
      code: 3,
      text: 'Breakage',
      imageUrl: '/assets/images/severity/breakage.png'
    }
  ];
  private incidents: Incident[] = [
    {
      id: 'INC0023',
      severity: this.severties[0],
      address: {
        road: '2',
        area: 'Whitefields',
        landmark: 'SBI Lane',
        city: 'Hyderabad'
      },
      location: {
        latitude: 46,
        longitude: 8.5
      }
    },
    {
      id: 'INC0024',
      severity: this.severties[1],
      address: {
        road: '2',
        area: 'Whitefields',
        landmark: 'SBI Lane',
        city: 'Hyderabad'
      },
      location: {
        latitude: 47,
        longitude: 8.9
      }
    },
    {
      id: 'INC0025',
      severity: this.severties[2],
      address: {
        road: '2',
        area: 'Whitefields',
        landmark: 'SBI Lane',
        city: 'Hyderabad'
      },
      location: {
        latitude: 47.6,
        longitude: 8.5
      }
    },
    {
      id: 'INC0026',
      severity: this.severties[3],
      address: {
        road: '2',
        area: 'Whitefields',
        landmark: 'SBI Lane',
        city: 'Hyderabad'
      },
      location: {
        latitude: 47.1,
        longitude: 8.3
      }
    },
  ];
  constructor() { }

  getAllIncidents(): Observable<Incident[]> {
    return of(this.incidents);
  }

  getIncident(incidentId: string) {
    return {...this.incidents.find(incident => {
      return incident.id === incidentId;
    })};
  }

  addIncident(incident: Incident) {
    function padLeft(str: any, char: string, length: number) {
      return char.repeat(length - str.toString().length) + str;
    }

    const latestIncident = this.incidents.reduce((p, c) => p.id > c.id ? p : c);
    const newId = 'INC' + padLeft(parseInt(latestIncident.id.replace ('INC', ''), 10) + 1, '0', 4);
    incident.id = newId;

    this.incidents.push(incident);
  }

  updateIncident(incident: Incident) {
    const index = this.incidents.map(e => e.id).indexOf(incident.id);
    if (index === -1) {
      this.addIncident(incident);
      return;
    }
    this.incidents[index] = incident;
  }

  deleteIncident(incidentId: string) {
    const index = this.incidents.map(e => e.id).indexOf(incidentId);
    if (index === -1 ) { return; }
    this.incidents.splice(index, 1);
  }

  getAllSeverities() {
    return [...this.severties];
  }
}
