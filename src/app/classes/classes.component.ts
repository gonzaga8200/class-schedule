import { Component, OnInit } from '@angular/core';
import {ClassRoomService} from '../services/class-room.service';
import {SubjectsService} from '../subjects.service';
import {MatDialog} from '@angular/material';
import {TimetableStudentComponent} from './timetable-student/timetable-student.component';
import {StudentsService} from '../services/students.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

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

    downloadPdf(pdfName: string, element: string) {
        const data = document.getElementById(element);
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            const imgWidth = 200;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 5;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.addPage();
            pdf.save(pdfName); // Generated PDF
        });
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
