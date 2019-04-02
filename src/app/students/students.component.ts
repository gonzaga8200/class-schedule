import {Component, OnInit, ViewChild} from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {SubjectsDataModel} from '../SubjectsDataModel';
import {SingleSubjectModel} from '../SingleSubjectModel';
import {ClassDataModel} from '../ClassDataModel';
import {NgForm} from '@angular/forms';
import {InfoStudentModel} from '../InfoStudentModel';
import {StudentsModel} from '../StudentsModel';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  subjectsInDataBase: SubjectsDataModel [] = [];
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
      const infoStudent = new InfoStudentModel(this.signUpForm.value.student, subjects);
      const newStudent = new StudentsModel("adad", infoStudent);
      console.log(infoStudent);
      this.subjectsService.addNewStudent (newStudent).
        subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );

  }

}
