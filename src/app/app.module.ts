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
    MatAutocompleteModule, MatCardModule, MatExpansionModule,
    MatFormFieldModule,
    MatGridList,
    MatGridListModule,
    MatGridTile,
    MatInputModule, MatListModule, MatSelectModule, MatSnackBarModule,
    MatTabGroup, MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ShowStudentsComponent } from './show-students/show-students.component';
import { SubjectsSelectionComponent } from './students/subjects-selection/subjects-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    ClassesComponent,
    ShowStudentsComponent,
    SubjectsSelectionComponent
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
      MatCardModule
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
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
