import { Component, OnInit } from '@angular/core';
import {ClassRoomService} from '../services/class-room.service';
import {SubjectsService} from '../subjects.service';
import {MatDialog} from '@angular/material';
import {TimetableStudentComponent} from './timetable-student/timetable-student.component';
import {StudentsService} from '../services/students.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.sass']
})
export class ClassesComponent {

  classRooms;
  classRoomsModel = ['sciences', 'literature', 'languages', 'extra', 'work'];
  hoursModel = ['0', '1', '2', '3', '4', '5'];
  name;

  constructor(private classRoomService: ClassRoomService,
              private subjectsService: SubjectsService,
              public dialog: MatDialog,
              private studentsService: StudentsService) {
      this.classRoomService.getClassRooms()
          .subscribe(
              response => {
                  this.classRooms = response;
                  Object.keys(this.classRooms).forEach(key => {
                      Object.keys(this.classRooms[key].timeTable).forEach(key2 => {
                          this.classRooms[key].timeTable[key2].students = [];
                      });
                  });
                  this.subjectsService.getStudents()
                      .subscribe(
                          students => {
                              Object.keys(students).forEach(student => {
                                  Object.keys(students[student].timeTable).forEach(studentHour => {
                                      const classRoom = students[student].timeTable[studentHour];
                                      this.classRooms[classRoom].timeTable[studentHour].students.push(
                                          {
                                              'name': students[student].name,
                                              'key': student
                                          }
                                      );
                                  });
                              });
                          }
                      );
              }
          );
  }

    openStudent(student: any): void {
        this.studentsService.getStudent(student)
            .subscribe(
                studentInfo => {
                    console.log(studentInfo);

                    const dialogRef = this.dialog.open(TimetableStudentComponent, {
                        width: '500px',
                        data: {
                            'studentInfo': studentInfo,
                            'infoClass': this.classRooms,
                            'keyStudent': student
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        console.log('The dialog was closed');
                        // this.animal = result;
                    });
                }
            );



    }
}
