/**
 * Created by Michael M. Simon on 3/26/2018.
 */
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './components/admin/admin.component';
import {EditMapComponent} from './components/edit-map//edit-map.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  //default home page
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
  path: 'edit-map',
  component: EditMapComponent
},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [],
  //imports all of our routes
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
