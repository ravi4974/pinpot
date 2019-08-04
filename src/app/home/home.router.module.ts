import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../incident/map/map.module').then(m => m.MapPageModule)
          }
        ]
      },
      {
        path: 'incidents',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../incident/incident.module').then(m => m.IncidentPageModule)
          },
          {
            path: ':incidentId',
            loadChildren: () =>
              import('../incident/incident-detail/incident-detail.module').then(m => m.IncidentDetailPageModule)
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../user/user.module').then(m => m.UserPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
