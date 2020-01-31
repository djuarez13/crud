import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TablaComponent} from './components/tabla/tabla.component';
import {FormularioComponent} from './components/formulario/formulario.component';

const routes: Routes = [
  {path: 'Tabla', component: TablaComponent},
  {path: 'formulario/:id', component: FormularioComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'Tabla'}
];




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot((routes))
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
