import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
    { 
        path: 'home',title: "Elektronikai szakszervíz",
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },

    {
        path: 'appointment', title: "Időpontfoglalás", 
        loadComponent: () => import('./pages/appointment/appointment.component').then(m => m.AppointmentComponent),
    },

    { 
        path: 'profile',title: "Profil",
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    },

    { 
        path: 'login',title: "Bejelentkezés",
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },

    { 
        path: 'registration',title: "Regisztráció",
        loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent),
    },

    { 
        path: '',
        redirectTo: 'home', 
        pathMatch: 'full'
    },

    { 
        path: '**',
        loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
    },
];