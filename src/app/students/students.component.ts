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

  subjectsInDataBase1Eso: SubjectModel [] = [];
  subjectsInDataBase2Eso: SubjectModel [] = [];
  subjectsInDataBase3Eso: SubjectModel [] = [];
  subjectsInDataBase4Eso: SubjectModel [] = [];
  subjectsInDataBasePmar1: SubjectModel [] = [];
  subjectsInDataBasePmar2: SubjectModel [] = [];
  subjectsInDataBaseAulaEnlace: SubjectModel [] = [];
  subjectsInDataBase: {
      '1eso': SubjectModel [],
      '2eso': SubjectModel [],
      '3eso': SubjectModel [],
      '4eso': SubjectModel [],
      'pmar1': SubjectModel [],
      'pmar2': SubjectModel [],
      'aulaEnlace': SubjectModel [],
  }
  subjectsRepresentation;

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
              this.subjectsRepresentation = response;
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const subject = new SubjectModel(key, value.name, value.associatedClass, value.course);
                  if (value.course === '1eso') {
                      this.subjectsInDataBase1Eso.push(subject);
                  }
                  if (value.course === '2eso') {
                      this.subjectsInDataBase2Eso.push(subject);
                  }
                  if (value.course === '3eso') {
                      this.subjectsInDataBase3Eso.push(subject);
                  }
                  if (value.course === '4eso') {
                      this.subjectsInDataBase4Eso.push(subject);
                  }
                  if (value.course === 'pmar1') {
                      this.subjectsInDataBasePmar1.push(subject);
                  }
                  if (value.course === 'pmar2') {
                      this.subjectsInDataBasePmar2.push(subject);
                  }
                  if (value.course === 'aulaEnlace') {
                      this.subjectsInDataBaseAulaEnlace.push(subject);
                  }
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
              });
          }
      );
  }

  onSubmit() {
      const subjects: SubjectModel [] = [];
      Object.keys(this.signUpForm.value.subjectsData).forEach(key => {
          const value = this.signUpForm.value.subjectsData[key];
          const subjectRepresentation = this.subjectsRepresentation[key];
          console.log(this.subjectsRepresentation[key]);
          if (value) {
              const subject = new SubjectModel(key, subjectRepresentation.name, subjectRepresentation.associatedClass, subjectRepresentation.course);
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
