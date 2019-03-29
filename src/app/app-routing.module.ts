import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesComponent} from './classes/classes.component';
import {StudentsComponent} from './students/students.component';

const routes: Routes = [
    {path: 'clases', component: ClassesComponent},
    {path: '', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
