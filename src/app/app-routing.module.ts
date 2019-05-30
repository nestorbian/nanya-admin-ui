import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeaAdminComponent } from './tea-admin/tea-admin.component';
import { HomeCarouseFigureComponent } from './home-carouse-figure/home-carouse-figure.component';
import { WellKnownTeaComponent } from './well-known-tea/well-known-tea.component';
import { WellKnownTeaAddComponent } from './well-known-tea-add/well-known-tea-add.component';
import { WellKnownTeaEditComponent } from './well-known-tea-edit/well-known-tea-edit.component';
import { TeaSetNewsComponent } from './tea-set-news/tea-set-news.component';
import { Code404Component } from './code404/code404.component';
import { PrintComponent } from './print/print.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent},
  { path: 'print-order/:id',  component: PrintComponent },
  { path: 'home-admin',  component: TeaAdminComponent, children: [
    { path: '',  component: HomeCarouseFigureComponent},
    { path: 'category',  component: HomeCarouseFigureComponent },
    { path: 'product',  component: WellKnownTeaComponent },
    { path: 'add-product',  component: WellKnownTeaAddComponent },
    { path: 'edit-product/:id',  component: WellKnownTeaEditComponent },
    { path: 'order',  component: TeaSetNewsComponent }
  ]},
  { path: '**',  component: Code404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
