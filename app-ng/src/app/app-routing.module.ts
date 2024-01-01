import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminTemplateComponent} from "./component/admin-template/admin-template.component";
import {WelcomeComponent} from "./component/welcome/welcome.component";
import {ClientComponent} from "./component/client/client.component";
import {EditClientComponent} from "./component/client/edit-client/edit-client.component";
import {AddClientComponent} from "./component/client/add-client/add-client.component";
import {ReservationsComponent} from "./component/reservations/reservations.component";
import {ResourcesComponent} from "./component/resources/resources.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [

  {path:"admin",component:AdminTemplateComponent,canActivate:[AuthGuard],data:{roles:['USER']},children:[
       {path:"reservations",component: ReservationsComponent},
      {path : "", component : WelcomeComponent,canActivate:[AuthGuard]},
      {path : "admins", component : ClientComponent,canActivate:[AuthGuard],data:{roles:['ADMIN']}},
      {path: 'editClient/:id', component: EditClientComponent ,canActivate:[AuthGuard]},
      {path: 'addClient/:id', component: AddClientComponent,canActivate:[AuthGuard] },
      {path: 'resources',component:ResourcesComponent,canActivate:[AuthGuard]}




    ]},
  {path : "", component : WelcomeComponent},
  // {path: "", component: AuthentificationsComponent },
  // {path: "login", component: AuthentificationsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
