import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login',component: LoginComponent },
  {
    path: 'products', 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'list/:id', component: ProductDetailsComponent ,canActivate: [AuthGuard]},
      { path: 'cart', component: CartComponent ,canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '/products' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
