import { Routes } from '@angular/router';
import { isAuthGuard } from './@guards/is-auth.guard';
import { DashboardPageComponent } from './@pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './@pages/login-page/login-page.component';
import { CalendarPageComponent } from './@pages/calendar-page/calendar-page.component';
import { GroupPageComponent } from './@pages/group-page/group-page.component';
import { SettingsPageComponent } from './@pages/settings-page/settings-page.component';
import { ProfilePageComponent } from './@pages/profile-page/profile-page.component';
import { NewTodoModalComponent } from './@components/new-todo-modal/new-todo-modal.component';
import { SearchModalComponent } from './@components/search-modal/search-modal.component';
import { isInGroupGuard } from './@guards/is-in-group.guard';
import { groupResolver } from './@resolvers/group.resolver';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
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
        canActivate: [isAuthGuard],
        resolve: { groupResolver },
    },
    { 
        path: 'calendar', 
        loadComponent: ()=> CalendarPageComponent,
        canActivate: [isAuthGuard]
    },
    { 
        path: 'group', 
        loadComponent: ()=> GroupPageComponent,
        canActivate: [
            isAuthGuard, 
            // isInGroupGuard,
        ],
        resolve: { groupResolver },
    },
    { 
        path: 'profile', 
        canActivate: [isAuthGuard],
        children: [
            {
                path: '',
                loadComponent: ()=> ProfilePageComponent,
                canActivate: [isAuthGuard]
            },
            { 
                path: ':id', 
                loadComponent: ()=> ProfilePageComponent,
                canActivate: [isAuthGuard]
            },
        ]
    },
    {
        path: 'settings',
        loadComponent: ()=> SettingsPageComponent,
        canActivate: [isAuthGuard]
    },
    {
        path: 'search',
        loadComponent: ()=> SearchModalComponent,
        canActivate: [isAuthGuard]
    },
    { 
        path: '**', 
        redirectTo: 'login',
    },
];
