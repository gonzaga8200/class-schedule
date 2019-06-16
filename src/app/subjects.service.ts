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
      let studentTimeTable = [];
      for (let i = 0; classVariation > 0 && i < this.conversionClassRoomHours[classVariation].length; i++) {
          for (let j = 0; j < this.conversionClassRoomHours[classVariation][i] ; j++) {
              studentTimeTable.push(studentClassRooms[advanceClassRoom]);
              advanceInTimeTable++;
          }
          advanceClassRoom++;
      }
      studentTimeTable = studentTimeTable.length > 0 ? studentTimeTable : this.setFlatTimeTableWithClassRoom('extra');
      return studentTimeTable;
  }

  private updateStudent(keyStudent: string, studentInfo: StudentModel) {
      return this.http.put(this.urlStudents + '/' + keyStudent + '.json', studentInfo)
          .subscribe(
              response => console.log(response)
          );
  }

  private setFlatTimeTableWithClassRoom(classRoom: string) {
      return Array(6).fill(classRoom);

  }



  setNewStudentsTimeTable(date: number) {
      const extraClassRoom = 'extra';
      this.getStudents()
          .subscribe(
              students => {
                  const examDate = new Date(date);
                  const afterExamDate = new Date();
                  afterExamDate.setDate(examDate.getDate() + 1);
                  Object.keys(students).forEach(student => {
                    const currentTimeTable = students[student].timeTable;
                    const studentSubjects: SubjectModel[] = [];
                    if (students[student].subjects) {
                        for (const subject of students[student].subjects) {
                            const subjectDate = new Date(subject.date);
                            if (subjectDate.getTime() !== date) {
                                studentSubjects.push(subject);
                            }
                        }
                    }
                    let studentTimeTable;
                    if (studentSubjects.length > 0) {
                        const classRoomsFromSubjects = this.getStudentClassRoomsFromSubjects(studentSubjects);
                        studentTimeTable = this.getTimeTableFromStudentClassRooms(classRoomsFromSubjects);

                    } else {
                        studentTimeTable = this.setFlatTimeTableWithClassRoom(extraClassRoom);
                    }
                    const nextDayTimeTable = students[student].nextWeekTimeTable || {};
                    nextDayTimeTable[afterExamDate.getDate() + '-' + (examDate.getMonth() + 1)] = studentTimeTable;
                    const studentInfo = new StudentModel(students[student].name,
                        studentSubjects, students[student].course, currentTimeTable, nextDayTimeTable);
                    this.updateStudent(student, studentInfo);


                  });
              }
          );
  }

  setWeekTimeTable(date: number) {
      const myDate = new Date(date);
      this.getSubjectsForJsonObservable(myDate)
          .subscribe(
              subjects => {
                        this.getStudents()
                            .subscribe(
                                students => {
                                    const examDate = new Date(date);
                                    const afterExamDate = new Date();
                                    afterExamDate.setDate(examDate.getDate() + 1);
                                    console.log(subjects);
                                    const subjectsByHour = this.getSubjectsByHour(subjects);
                                    console.log(subjectsByHour);
                                    Object.keys(students).forEach(student => {
                                        const studentInfo = students[student];
                                        const studentSubjects = students[student].subjects;
                                        let studentTimeTable = students[student].timeTable;
                                        console.log(studentInfo.subjects);
                                        let tmpStudentTimeTable;
                                        // console.log(studentTimeTable);
                                        let i = 0;
                                        while (i < studentTimeTable.length) {
                                            const studentSubjectsObject = this.getSubjectsStudent(subjectsByHour[i], studentSubjects);
                                            if (studentSubjectsObject.match.length > 0) {
                                                for (let d = 0; d < studentSubjectsObject.match[0].duration; d++) {
                                                    studentTimeTable[i] = 'Examen';
                                                    i++;
                                                }
                                                const classRoomsFromSubjects =
                                                    this.getStudentClassRoomsFromSubjects(studentSubjectsObject.remain);
                                                tmpStudentTimeTable = this.getTimeTableFromStudentClassRooms(classRoomsFromSubjects);
                                                studentTimeTable = this.matchTimeTableFromHour(i, tmpStudentTimeTable, studentTimeTable);
                                            } else {
                                                i++;
                                            }
                                        }
                                        const nextWeekTimeTable = students[student].nextWeekTimeTable || {};
                                        nextWeekTimeTable[examDate.getDate() + '-' + (examDate.getMonth() + 1)] = studentTimeTable;
                                        nextWeekTimeTable[afterExamDate.getDate() + '-' + (afterExamDate.getMonth() + 1)] =
                                            tmpStudentTimeTable;
                                        const finalStudentInfo = new StudentModel(students[student].name,
                                            studentInfo.subjects, students[student].course, students[student].timeTable, nextWeekTimeTable);
                                        this.updateStudent(student, finalStudentInfo);

                                    } );
                                }
                            );
              }
          );

  }

  private getSubjectsByHour(subjects: Object) {
      const subjectsByHour = {
          '0': [],
          '1': [],
          '2': [],
          '3': [],
          '4': [],
          '5': []
      };
      Object.keys(subjects).forEach(subject => {
          const subjectHour = subjects[subject].hour;
          subjectsByHour[subjectHour].push(subjects[subject]);
      });
      return subjectsByHour;

  }
  private getSubjectsStudent(subjects: any[], subjectsStudent: any[]) {
      const resultSubjectKeys = [];
      const resultSubjectStudent = subjectsStudent;
      for (let i = 0; i < subjects.length; i++) {
          const positionSubject = this.isIncludeSubjectInStudent(subjects[i], resultSubjectStudent);
          if (positionSubject !== -1) {
            resultSubjectKeys.push(subjects[i]);
              resultSubjectStudent.splice(positionSubject, 1);
          }
      }
      return {
          'match': resultSubjectKeys,
          'remain': resultSubjectStudent
      };
  }

  private isIncludeSubjectInStudent (subject: any, subjectsStudent ) {

      for (let i = 0; subjectsStudent && i < subjectsStudent.length; i++) {
          if (subject.name === subjectsStudent[i].name && subject.course === subjectsStudent[i].course) {
              return i;
          }
      }
      return -1;
  }

  private matchTimeTableFromHour (hour: number, newTimeTable: any[], studentTimeTable: any[]) {
        const result = studentTimeTable;
        for (let i = hour; i < studentTimeTable.length; i++) {
            studentTimeTable[i] = newTimeTable[i];
        }
        return result;
  }
}
