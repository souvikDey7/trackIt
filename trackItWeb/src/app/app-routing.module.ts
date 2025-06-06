import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'joinroom', component: RoomComponent },
  { path: 'createroom', component: RoomComponent },
  { path: 'back', component: LoginComponent },
  { path: 'start', component: LoginComponent },
  {path:"logout",component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
