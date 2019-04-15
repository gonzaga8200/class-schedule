import {Component, OnInit, ViewChild} from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {FormControl, NgForm} from '@angular/forms';
import {StudentModel} from '../models/StudentModel';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SubjectModel} from '../models/SubjectModel';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';

export interface Course {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  subjectsInDataBase: SubjectModel [] = [];
  @ViewChild('f') signUpForm: NgForm;
  students: StudentModel [] = [];
    courses: Course[] = [
        {value: '1eso', viewValue: '1º ESO'},
        {value: '2eso', viewValue: '2º ESO'},
        {value: '3eso', viewValue: '3º ESO'},
        {value: '4eso', viewValue: '4º ESO'},
        {value: 'pmar1', viewValue: 'PMAR 1'},
        {value: 'pmar2', viewValue: 'PMAR 2'},
        {value: 'aulaEnlace', viewValue: 'Aula de Enlace'}
    ];

  constructor(private subjectsService: SubjectsService) {

  }



  ngOnInit() {
      this.subjectsService.getSubjectsForJson().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const subject = new SubjectModel(value.name, value.associatedClass);
                  this.subjectsInDataBase.push(subject);
              });
          }
      );
      this.subjectsService.getStudents().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const newStudent = new StudentModel(value.name, value.subjects, value.course);
                  this.students.push(newStudent);
              })
          }
      )
  }

  onSubmit() {


      const subjects: SubjectModel [] = [];
      Object.keys(this.signUpForm.value.subjectsData).forEach(key => {
          const value = this.signUpForm.value.subjectsData[key];
          if (value) {
              const subject = new SubjectModel(value.name, value.associatedClass);
              subjects.push(subject);
          }
      });
      console.log(subjects);
      const newStudent = new StudentModel (this.signUpForm.value.student, subjects, this.signUpForm.value.courseStudent);
      console.log(newStudent);
      this.subjectsService.addNewStudent (newStudent).
        subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );
      this.students.push(newStudent);

  }

}
