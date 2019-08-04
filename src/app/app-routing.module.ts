import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'confirm-incident', loadChildren: './incident/new-incident/new-incident.module#NewIncidentPageModule' },
  { path: 'new-incident', loadChildren: './incident/new-incident/camera/camera.module#CameraPageModule' },
  { path: 'severity', loadChildren: './incident/new-incident/severity/severity.module#SeverityPageModule' },
  { path: 'address', loadChildren: './incident/new-incident/address/address.module#AddressPageModule' },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './user/register/register.module#RegisterPageModule' }
  /*
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'incident', loadChildren: './incident/incident.module#IncidentPageModule' },
  { path: 'map', loadChildren: './incident/map/map.module#MapPageModule' },
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
