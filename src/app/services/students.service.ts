import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from '../models/StudentModel';

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

  setStudentTimeTableHour (studentKey: string, hour: string, classRoom: string) {
    const pathToTimeTable = this.urlStudents + '/' + studentKey + '/timeTable/' + hour;
    return this.http.put(pathToTimeTable, classRoom);
  }


}
