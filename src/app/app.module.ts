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
    MatAutocompleteModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule,
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
import { SubjectsManagmentComponent } from './subjects-managment/subjects-managment.component';
import { ExamSubjectsComponent } from './exam-subjects/exam-subjects.component';
import { SubjectsInDateComponent } from './exam-subjects/subjects-in-date/subjects-in-date.component';

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
    SubjectsManagmentComponent,
    ExamSubjectsComponent,
    SubjectsInDateComponent
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
      MatNativeDateModule,
      MatListModule,
      MatDividerModule
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
