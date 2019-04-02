import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentsModel} from './StudentsModel';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  urlSubjects =  'https://class-schedule-fd50c.firebaseio.com/subjects.json';
  urlStudents =  'https://class-schedule-fd50c.firebaseio.com/students/';

  constructor(private http: HttpClient) { }

  getSubjectsForJson() {

      return this.http.get(this.urlSubjects);

  }

  addNewStudent(student: StudentsModel) {
      return this.http.put(this.urlStudents + student.infoStudent.name + '.json', student);
  }
}
