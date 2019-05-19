import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesComponent} from './classes/classes.component';
import {StudentsComponent} from './students/students.component';
import {ShowStudentsComponent} from './show-students/show-students.component';
import {SubjectsManagmentComponent} from './subjects-managment/subjects-managment.component';

const routes: Routes = [
    {path: 'clases', component: ClassesComponent},
    {path: '', component: StudentsComponent},
    {path: 'show-students', component: ShowStudentsComponent},
    {path: 'asignaturas-gestion', component: SubjectsManagmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
