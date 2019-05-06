import {Component, OnInit, ViewChild} from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {FormControl, NgForm} from '@angular/forms';
import {StudentModel} from '../models/StudentModel';
import {SubjectModel} from '../models/SubjectModel';
import {TimeTableClassesModel} from '../models/TimeTableClassesModel';
import {MatSnackBar} from '@angular/material';

export interface Course {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {
  subjectsInDataBase = {
      '1eso': [],
      '2eso': [],
      '3eso': [],
      '4eso': [],
      'pmar1': [],
      'pmar2': [],
      'aulaEnlace':  []
  };
  subjectsRepresentation;

  @ViewChild('f') signUpForm: NgForm;
  students: StudentModel [] = [];
    courses: Course[] = [
        {value: '1eso', viewValue: '1º ESO'},
        {value: '2eso', viewValue: '2º ESO'},
        {value: '3eso', viewValue: '3º ESO'},
        {value: '4eso', viewValue: '4º ESO'},
        {value: 'pmar1', viewValue: 'PMAR 1'},
        {value: 'pmar2', viewValue: 'PMAR 2'},
        {value: 'aulaEnlace', viewValue: 'Aula de Enlace'}
    ];
  timeTableHours = ['firstHour', 'secondHour', 'thirdHour', 'fourthHour', 'fifthHour', 'sixthHour'];
  conversionClassRoomHours = {
      '1' : [6],
      '2' : [3, 3],
      '3' : [2, 2, 2],
      '4' : [1, 1, 2, 2],
      '5' : [1, 1, 1, 2, 1],
      '6' : [1, 1, 1, 1, 1, 1],
  };

  durationInSeconds = 6;

  constructor(private subjectsService: SubjectsService, private snackBar: MatSnackBar) {

  }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }



  ngOnInit() {
      this.subjectsService.getSubjectsForJson().
        subscribe(
          (response) => {
              this.subjectsRepresentation = response;
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  this.subjectsInDataBase[value.course].push(new SubjectModel(key, value.name, value.associatedClass, value.course));
              });
          }
      );
      this.subjectsService.getStudents().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const newStudent = new StudentModel(value.name, value.subjects, value.course, value.timeTable);
                  this.students.push(newStudent);
              });
          }
      );
  }

  onSubmit() {
      const subjects: SubjectModel [] = [];
      const studentClassRoomsRepresentation = [];
      Object.keys(this.signUpForm.value.subjectsData).forEach(key => {
          const value = this.signUpForm.value.subjectsData[key];
          const subjectRepresentation = this.subjectsRepresentation[key];
          if (value) {
              if (!studentClassRoomsRepresentation.includes(subjectRepresentation.associatedClass)) {
                  studentClassRoomsRepresentation.push(subjectRepresentation.associatedClass);
              }
              const subject = new SubjectModel(key, subjectRepresentation.name, subjectRepresentation.associatedClass, subjectRepresentation.course);
              subjects.push(subject);
          }
      });
      const classVariation = studentClassRoomsRepresentation.length;
      const studentTimeTable = new TimeTableClassesModel('', '', '3',
          '', '', '');

      let advanceClassRoom = 0;
      let advanceInTimeTable = 0;
      for (let i = 0; i < this.conversionClassRoomHours[classVariation].length; i++) {
         for (let j = 0; j < this.conversionClassRoomHours[classVariation][i] ; j++) {
            studentTimeTable[this.timeTableHours[advanceInTimeTable]] = studentClassRoomsRepresentation[advanceClassRoom];
            advanceInTimeTable++;
         }
         advanceClassRoom++;
      }

      Object.keys(studentTimeTable).forEach(key => {

      })


      const newStudent = new StudentModel (this.signUpForm.value.student, subjects, this.signUpForm.value.courseStudent, studentTimeTable);
      this.subjectsService.addNewStudent (newStudent).
        subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );
      this.students.push(newStudent);

      this.signUpForm.reset();

      this.openSnackBar('Alumno Añadido', newStudent.name);

  }

}

