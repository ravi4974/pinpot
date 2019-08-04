import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IncidentService } from '../incident.service';
import { Incident } from '../incident.model';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MarkerIcon
} from '@ionic-native/google-maps/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
  map: GoogleMap;

  constructor(private connectivityService: ConnectivityService,
              private geolocation: Geolocation,
              private incidentService: IncidentService,
              private router: Router,
              private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  refreshMarkers() {
    this.incidentService.getAllIncidents().subscribe((incidents) => {
      this.map.clear();
      incidents.forEach(incident => {
        const iconImage: MarkerIcon = {
          url: incident.severity.imageUrl,
          size: {
            width: 30,
            height: 30
          }
        };
        const marker: Marker = this.map.addMarkerSync({
          title: incident.severity.text + ' - ' + incident.id,
          position: {
            lat: incident.location.latitude,
            lng: incident.location.longitude
          },
          animation: 'DROP',
          icon: iconImage
        });
      });
    });
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyA8K6aptNten9fNlIFVqUptTYALDCh83Qk',
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyA8K6aptNten9fNlIFVqUptTYALDCh83Qk'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target : {
          lat: 46.39,
          lng: 8.7
        },
        zoom: 15
      }
    };

    this.map = GoogleMaps.create('mapElement', mapOptions);

    this.refreshMarkers();

  }
}
