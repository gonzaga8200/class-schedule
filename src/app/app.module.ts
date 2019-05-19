import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentsComponent } from './students/students.component';
import {HttpClientModule} from '@angular/common/http';
import { ClassesComponent } from './classes/classes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatAutocompleteModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatGridList,
    MatGridListModule,
    MatGridTile,
    MatInputModule, MatListModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule,
    MatTabGroup, MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ShowStudentsComponent } from './show-students/show-students.component';
import { SubjectsSelectionComponent } from './students/subjects-selection/subjects-selection.component';
import { TimetableStudentComponent } from './classes/timetable-student/timetable-student.component';
import {TimetableFormComponent} from './classes/timetable-student/timetable-form/timetable-form.component';
import { SubjectsManagmentComponent } from './subjects-managment/subjects-managment.component';

;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    ClassesComponent,
    ShowStudentsComponent,
    SubjectsSelectionComponent,
    TimetableStudentComponent,
    TimetableFormComponent,
    SubjectsManagmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      FormsModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatGridListModule,
      MatTabsModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatListModule,
      MatCardModule,
      MatDialogModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  entryComponents: [TimetableStudentComponent],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
