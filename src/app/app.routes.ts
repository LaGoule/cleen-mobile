import { Routes } from '@angular/router';
import { DashboardPageComponent } from './@pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './@pages/login-page/login-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'login', component: LoginPageComponent },
];
