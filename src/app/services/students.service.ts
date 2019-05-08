import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  urlStudents =  'https://class-schedule-fd50c.firebaseio.com/students/';
  constructor(private http: HttpClient) {

  }

  getStudent (studentKey: string) {
    return this.http.get(this.urlStudents + studentKey + '.json');
  }
}
