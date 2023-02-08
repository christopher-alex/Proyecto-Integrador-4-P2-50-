import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/guards/login.guard';
import { LoginComponent } from './auth/login/login.component';
import { AuthClientGuard } from './auth/guards/auth-client.guard';
import { RegisterComponent } from './auth/register/register.component';
import { AuthProviderGuard } from './auth/guards/auth-provider.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
      {
        path: 'register',
        canActivate: [LoginGuard],
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'layout',
    canActivate: [AuthProviderGuard],
    loadChildren: () =>
      import('./layouts/provider/layout.module').then(
        (m) => m.LayoutProviderModule
      ),
  },
  {
    path: 'cine',
    canActivate: [AuthClientGuard],
    loadChildren: () =>
      import('./layouts/client/layout.module').then(
        (m) => m.LayoutClientModule
      ),
  },
  {
    path: 'feature',
    loadChildren: () =>
      import('./feature/feature.module').then((m) => m.FeatureModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
