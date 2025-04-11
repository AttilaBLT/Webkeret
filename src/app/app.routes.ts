import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'home',title: "Elektronikai szakszervíz", component: HomeComponent },

    {
        path: 'appointment', title: "Időpontfoglalás", 
        loadComponent: () => import('./pages/appointment/appointment.component').then(m => m.AppointmentComponent),
    },

    //paraméteres útvonal saját időpnt vagy saját eszközre pl
    // { path: 'appointment-edit/:id, component: AppointmentEditComponent },

    { path: 'profile',title:"Profil", component: ProfileComponent},

    { path: '',redirectTo: 'home', pathMatch: 'full'},

    { path: '**', component:PageNotFoundComponent },


];
