import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from './models/StudentModel';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  urlSubjects =  'https://class-schedule-fd50c.firebaseio.com/subjects';
  urlStudents =  'https://class-schedule-fd50c.firebaseio.com/students.json';
  students: StudentModel[];

  constructor(private http: HttpClient) { }

  getSubjectsForJson() {

      return this.http.get(this.urlSubjects + '.json');

  }

    getDatesSubjects() {
        return this.http.get(this.urlSubjects + '.json')
            .pipe(
                map(subject => {
                    const datesSubject = [];
                    Object.keys(subject).forEach(key => {
                            const dateSubject = new Date(subject[key].date);
                            if (!datesSubject.includes(dateSubject.getTime())) {
                                datesSubject.push(dateSubject.getTime());
                            }
                        }

                    );
                    return datesSubject;
                })
            );
    }
    getSubjectsForJsonObservable(date: Date) {

        return this.http.get(this.urlSubjects + '.json')
            .pipe(
                map(subject => {
                    const subjectsInHour = [];
                    Object.keys(subject).forEach(key => {
                        const dateSubject = new Date(subject[key].date);
                            if (dateSubject.getTime() === date.getTime()) {
                                subjectsInHour.push(subject[key]);
                            }
                        }

                    );
                    return subjectsInHour;
                })
            );

    }

  getStudents() {
      return this.http.get(this.urlStudents);
  }

    getStudentsTest () {
       return this.http.get(this.urlStudents)
           .pipe(
               map(val => {
                   const example: StudentModel[] = [];
                   Object.keys(val).forEach(key => {
                       example.push(val[key]);
                   });
                   return example;
               }),
           );
    }

  addNewStudent(student: StudentModel) {
      return this.http.post(this.urlStudents, student);
  }

  addNewSubject (keySubject: string, subjectInfo: {'name': string, 'associatedClass': string, 'date': Date, 'course': string }) {
      return this.http.put(this.urlSubjects + '/' + keySubject + '.json', subjectInfo);
  }
}
