import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'joinroom', component: RoomComponent },
  { path: 'createroom', component: RoomComponent },
  { path: 'back', component: AppComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
