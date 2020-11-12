import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from "./products/add/add.component";
import { ViewComponent } from "./products/view/view.component";
import { LoginComponent } from "./login/login.component";
import { DetailComponent } from './products/detail/detail.component';

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "product/add", component: AddComponent },
  { path: "products", component: ViewComponent },
  { path: "login", component: LoginComponent },
  { path: "product/details/:id", component: DetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
