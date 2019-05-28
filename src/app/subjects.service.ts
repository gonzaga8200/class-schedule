import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from './models/StudentModel';
import { map } from 'rxjs/operators';
import {SubjectModel} from './models/SubjectModel';
import {StudentsService} from './services/students.service';

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

  constructor(private http: HttpClient, private studentService: StudentsService) { }

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
                    return datesSubject.sort();
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
      for (let i = 0; classVariation > 0 && i < this.conversionClassRoomHours[classVariation].length; i++) {
          for (let j = 0; j < this.conversionClassRoomHours[classVariation][i] ; j++) {
              studentTimeTable.push(studentClassRooms[advanceClassRoom]);
              advanceInTimeTable++;
          }
          advanceClassRoom++;
      }
      return studentTimeTable;
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
                    const studentSubjects: SubjectModel[] = [];
                    for (const subject of students[student].subjects) {
                        const subjectDate = new Date(subject.date);
                        if (subjectDate.getTime() !== date) {
                            studentSubjects.push(subject);
                        }
                    }
                    if (studentSubjects.length > 0) {
                        const classRoomsFromSubjects = this.getStudentClassRoomsFromSubjects(studentSubjects);
                        const studentTimeTable = this.getTimeTableFromStudentClassRooms(classRoomsFromSubjects);
                        const studentInfo = new StudentModel(students[student].name,
                            studentSubjects, students[student].course, studentTimeTable);
                        this.updateStudent(student, studentInfo);
                    } else {
                        this.studentService.deleteStudent(student);
                    }


                  });
              }
          );
  }
}
