import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from '../models/StudentModel';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

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

  deleteStudent (studentKey: string) {
        const url = this.urlStudents + studentKey + '.json'; // DELETE api/heroes/42
        return this.http.delete(url)
            .subscribe(
                response => console.log(response)
            );
    }

  setStudentTimeTable (studentKey: string, timeTable: string[]) {
    const pathToTimeTable = this.urlStudents + '/' + studentKey + '/timeTable.json';
    return this.http.put(pathToTimeTable, timeTable);
  }


}
