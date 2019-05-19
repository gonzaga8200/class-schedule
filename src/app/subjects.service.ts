import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from './models/StudentModel';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  urlSubjects =  'https://class-schedule-fd50c.firebaseio.com/subjects';
  urlStudents =  'https://class-schedule-fd50c.firebaseio.com/students.json';

  constructor(private http: HttpClient) { }

  getSubjectsForJson() {

      return this.http.get(this.urlSubjects + '.json');

  }

  getStudents() {
      return this.http.get(this.urlStudents);
  }

  addNewStudent(student: StudentModel) {
      return this.http.post(this.urlStudents, student);
  }

  addNewSubject (keySubject: string, subjectInfo: {'name': string, 'associatedClass': string, 'date': Date, 'course': string }) {
      return this.http.put(this.urlSubjects + '/' + keySubject + '.json', subjectInfo);
  }
}
