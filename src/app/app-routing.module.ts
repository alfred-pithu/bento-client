import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { authGuard } from './guards/auth/auth.guard';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { MapComponent } from './pages/map/map.component';
import { AccessibleSilosComponent } from './pages/accessible-silos/accessible-silos.component';
import { InventoryContainerComponent } from './pages/inventory-container/inventory-container.component';
import { MenuContainerComponent } from './pages/menu-container/menu-container.component';
import { HrContainerComponent } from './pages/hr-container/hr-container.component';
import { OrdersContainerComponent } from './pages/orders-container/orders-container.component';
import { ControlPanelContainerComponent } from './pages/control-panel-container/control-panel-container.component';
import { ownerGuardGuard } from './guards/owner/owner-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent, },
  { path: 'logout', component: LogoutPageComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [noAuthGuard] },
  { path: 'map', component: MapComponent },

  { path: 'redirect', component: RedirectPageComponent },
  {
    path: '', component: PageContainerComponent, canActivate: [authGuard], children: [
      {
        path: 'dashboard', component: DashboardPageComponent, children: [
          { path: '', redirectTo: 'accessible-silos', pathMatch: 'full' }, // Redirect /dashboard to /dashboard/accessible-silos
          { path: 'accessible-silos', component: AccessibleSilosComponent },
          { path: 'control-panel', component: ControlPanelContainerComponent, canActivate: [ownerGuardGuard] },
          // { path: 'control-panel', component: ControlPanelContainerComponent },
          { path: 'inventory', component: InventoryContainerComponent, canActivate: [ownerGuardGuard] },
          { path: 'menu', component: MenuContainerComponent, canActivate: [ownerGuardGuard] },
          { path: 'hr', component: HrContainerComponent, canActivate: [ownerGuardGuard] },
          { path: 'orders', component: OrdersContainerComponent, canActivate: [ownerGuardGuard] }
        ]
      },
      { path: '**', redirectTo: '/home' }
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
