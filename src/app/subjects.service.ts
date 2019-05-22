import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from './models/StudentModel';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError, tap} from 'rxjs/internal/operators';
import {SubjectModel} from './models/SubjectModel';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  urlSubjects =  'https://class-schedule-fd50c.firebaseio.com/subjects';
  urlStudents =  'https://class-schedule-fd50c.firebaseio.com/students';
  students: StudentModel[];

    conversionClassRoomHours = {
        '1' : [6],
        '2' : [3, 3],
        '3' : [2, 2, 2],
        '4' : [1, 1, 2, 2],
        '5' : [1, 1, 1, 2, 1],
        '6' : [1, 1, 1, 1, 1, 1],
    };

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
      return this.http.get(this.urlStudents + '.json');
  }



  addNewStudent(student: StudentModel) {
      return this.http.post(this.urlStudents + '.json', student);
  }

  addNewSubject (keySubject: string, subjectInfo: {'name': string, 'associatedClass': string, 'date': Date, 'course': string }) {
      return this.http.put(this.urlSubjects + '/' + keySubject + '.json', subjectInfo);
  }

  private getStudentClassRoomsFromSubjects(subjects: SubjectModel[]) {
    const studentClassRooms = [];
    for (let i = 0; i < subjects.length; i ++ ) {
        if (!studentClassRooms.includes(subjects[i].associatedClass)) {
                studentClassRooms.push(subjects[i].associatedClass);
        }
    }
    return studentClassRooms;
  }

  private getTimeTableFromStudentClassRooms(studentClassRooms: string[]) {
      const classVariation = studentClassRooms.length;
      let advanceClassRoom = 0;
      let advanceInTimeTable = 0;
      const studentTimeTable = [];
      for (let i = 0; i < this.conversionClassRoomHours[classVariation].length; i++) {
          for (let j = 0; j < this.conversionClassRoomHours[classVariation][i] ; j++) {
              studentTimeTable.push(studentClassRooms[advanceClassRoom]);
              advanceInTimeTable++;
          }
          advanceClassRoom++;
      }
      return studentTimeTable;
  }

  private deleteStudentSubject(keyStudent: string, subjectStudent: string) {
      return this.http.delete(this.urlStudents + '/' + keyStudent + '/subjects/' + subjectStudent + '.json')
          .subscribe(
              response => console.log(response)
          );
  }

  private updateStudent(keyStudent: string, studentInfo: StudentModel) {
      return this.http.put(this.urlStudents + '/' + keyStudent + '.json', studentInfo)
          .subscribe(
              response => console.log(response)
          );
  }

  setNewStudentsTimeTable(date: number) {
      this.getStudents()
          .subscribe(
              students => {
                  Object.keys(students).forEach(student => {
                    Object.keys(students[student].subjects).forEach( subject => {
                        const subjectDate = new Date(students[student].subjects[subject].date);
                        if (subjectDate.getTime() === date) {
                            delete students[student].subjects[subject];
                        }
                    });
                    const classRoomsFromSubjects = this.getStudentClassRoomsFromSubjects(Object.values(students[student].subjects));
                    const studentTimeTable = this.getTimeTableFromStudentClassRooms(classRoomsFromSubjects);
                    const studentInfo = new StudentModel(students[student].name, students[student].subjects, students[student].course, studentTimeTable);
                    this.updateStudent(student, studentInfo);

                  });
              }
          );
  }
}
