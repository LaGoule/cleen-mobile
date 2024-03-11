import { Routes } from '@angular/router';
import { authenticationGuard } from './@guards/authentication.guard';
import { DashboardPageComponent } from './@pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './@pages/login-page/login-page.component';
import { CalendarPageComponent } from './@pages/calendar-page/calendar-page.component';
import { MembersPageComponent } from './@pages/members-page/members-page.component';
import { SettingsPageComponent } from './@pages/settings-page/settings-page.component';
import { ProfilePageComponent } from './@pages/profile-page/profile-page.component';
import { NewTodoModalComponent } from './@components/new-todo-modal/new-todo-modal.component';
import { SearchModalComponent } from './@components/search-modal/search-modal.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        loadComponent: ()=> LoginPageComponent 
    },
    { 
        path: 'dashboard', 
        loadComponent: ()=> DashboardPageComponent,
        canActivate: [authenticationGuard],
    },
    { 
        path: 'calendar', 
        loadComponent: ()=> CalendarPageComponent,
        canActivate: [authenticationGuard]
    },
    {
        path: 'newtodo',
        loadComponent: ()=> NewTodoModalComponent,
        canActivate: [authenticationGuard]
    },
    { 
        path: 'members', 
        loadComponent: ()=> MembersPageComponent,
        canActivate: [authenticationGuard]
    },
    {
        path: 'settings',
        loadComponent: ()=> SettingsPageComponent,
        canActivate: [authenticationGuard]
    },
    { 
        path: 'profile', 
        loadComponent: ()=> ProfilePageComponent,
        canActivate: [authenticationGuard]
    },
    {
        path: 'search',
        loadComponent: ()=> SearchModalComponent,
        canActivate: [authenticationGuard]
    },
    { 
        path: '**', 
        redirectTo: 'login',
    },
];
