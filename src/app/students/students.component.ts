import {Component, OnInit, ViewChild} from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {SubjectsDataModel} from '../models/SubjectsDataModel';
import {SingleSubjectModel} from '../models/SingleSubjectModel';
import {ClassDataModel} from '../models/ClassDataModel';
import {NgForm} from '@angular/forms';
import {StudentModel} from '../models/StudentModel';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  subjectsInDataBase: SubjectsDataModel [] = [];
  students: StudentModel [] = [];
  @ViewChild('f') signUpForm: NgForm;
  defaultSubject = false;

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
      this.subjectsService.getSubjectsForJson().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const subjectClass = new ClassDataModel(value.class.idClass, value.class.name);
                  const infoSubject = new SingleSubjectModel(value.name, subjectClass);
                  const subject = new SubjectsDataModel(key, infoSubject);
                  this.subjectsInDataBase.push(subject);
              });
          }
      );
      this.subjectsService.getStudents().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  //const newStudent = new StudentModel(studen)
              })
          }
      )
  }

  onSubmit() {


      const subjects: SubjectsDataModel [] = [];
      Object.keys(this.signUpForm.value.subjectsData).forEach(key => {
          const value = this.signUpForm.value.subjectsData[key];
          if (value) {
              const classDataModel = new ClassDataModel(value.subjectInfo.associatedClass.idClass, value.subjectInfo.associatedClass.name);
              const singleSubjectModel = new SingleSubjectModel(value.subjectInfo.name, classDataModel);
              const subjectDataModel = new SubjectsDataModel(key, singleSubjectModel);
              subjects.push(subjectDataModel);
          }
      });
      console.log(subjects);
      const newStudent = new StudentModel (this.signUpForm.value.student, subjects);
      console.log(newStudent);
      this.subjectsService.addNewStudent (newStudent).
        subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );

  }

}
