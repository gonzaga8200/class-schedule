import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {SubjectsDataModel} from '../SubjectsDataModel';
import {SingleSubjectModel} from '../SingleSubjectModel';
import {ClassDataModel} from '../ClassDataModel';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  subjectsInDataBase: SubjectsDataModel [] = [];

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

  getSubjectInStudents() {
    this.subjectsService.getSubjectsForJson();
  }

}
