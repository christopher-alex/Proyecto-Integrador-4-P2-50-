import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/guards/login.guard';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
      { path: 'register',canActivate: [LoginGuard],  component: RegisterComponent}
    ],
  },
  {
    path: 'layout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layouts/provider/layout.module').then(
        (m) => m.LayoutProviderModule
      ),
  },
  {
    path: 'cine',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layouts/client/layout.module').then(
        (m) => m.LayoutClientModule
      ),
  },
  {
    path: 'feature',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./feature/feature.module').then((m) => m.FeatureModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
