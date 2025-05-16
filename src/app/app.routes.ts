import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
    { 
        path: 'home',title: "Elektronikai szakszervíz",
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },

    { 
        path: 'add-service-type',title: "Szervíz lehetőség hozzáadása",
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/add-service-type/add-service-type.component').then(m => m.AddServiceTypeComponent),
    },

    { 
        path: 'add-device',title: "Eszköz hozzáadás",
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/add-device/add-device.component').then(m => m.AddDeviceComponent),
    },

    {
        path: 'appointment', title: "Időpontfoglalás",
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/appointment/appointment.component').then(m => m.AppointmentComponent),
    },

    {
        path: 'profile', title: "Profil",
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    },

    { 
        path: 'login', title: "Bejelentkezés",
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },

    { 
        path: 'registration', title: "Regisztráció",
        loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent),
    },

    { 
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
    },

    { 
        path: '**',
        loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
    },
];