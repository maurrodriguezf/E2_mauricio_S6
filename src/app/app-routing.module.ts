import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [AuthGuard] },
  { path: 'events', loadComponent: () => import('./pages/events/events.page').then(m => m.EventsPage), canActivate: [AuthGuard] },
  { path: 'events/:id', loadComponent: () => import('./pages/event-detail/event-detail.page').then(m => m.EventDetailPage), canActivate: [AuthGuard] },
  { path: 'activities', loadComponent: () => import('./pages/activities-list/activities-list.page').then(m => m.ActivitiesListPage), canActivate: [AuthGuard] },
  { path: 'activities/:type', loadComponent: () => import('./pages/activities-list/activities-list.page').then(m => m.ActivitiesListPage), canActivate: [AuthGuard] },
  { path: 'activities/detail/:id', loadComponent: () => import('./pages/event-detail/event-detail.page').then(m => m.EventDetailPage), canActivate: [AuthGuard] },
  { path: 'reservation', loadComponent: () => import('./pages/reservation/reservation.page').then(m => m.ReservationPage), canActivate: [AuthGuard] },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage), canActivate: [AuthGuard] },
  // legacy / demo route
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'nombre-de-la-pagina', loadChildren: () => import('./nombre-de-la-pagina/nombre-de-la-pagina.module').then(m => m.NombreDeLaPaginaPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
