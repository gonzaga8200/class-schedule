import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {map, startWith} from 'rxjs/operators';
import {StudentModel} from '../models/StudentModel';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {SubjectModel} from '../models/SubjectModel';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import {ClassRoomService} from '../services/class-room.service';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.sass']
})
export class ShowStudentsComponent implements OnInit {
  filteredStudents: Observable<StudentModel[]>;
  classRoomsSource;
  studentCtrl = new FormControl();
  students: StudentModel [] = [];
  subjects: SubjectModel [] = [];
  studentName: string;
  timeTable = [];


  constructor(private subjectsService: SubjectsService, private classRooms: ClassRoomService ) {
    this.filteredStudents = this.studentCtrl.valueChanges
      .pipe(
          startWith<string | StudentModel>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterStudents(name) : this.students.slice())
      );
    this.classRooms.getClassRooms()
        .subscribe(
            response => this.classRoomsSource = response
        );
  }

  private _filterStudents(value: string): StudentModel[] {
    const filterValue = value.toLowerCase();

    return this.students.filter(state => state.name.toLowerCase().includes(filterValue));
  }

    displayFn(student?: StudentModel): string | undefined {
        return student ? student.name : undefined;
    }

    callSomeFunction(student: StudentModel) {
      // console.log(student.getSubjects());
      // console.log(typeof this.studentCtrl.value);
      this.subjects = student.getSubjects();
      this.timeTable = Object.values(student.getTimeTable());
      this.studentName = student.getName();


    }

   downloadPdf(pdfName: string, element: string) {
       const data = document.getElementById(element);
         html2canvas(data).then(canvas => {
   // Few necessary setting options
             const imgWidth = 200;
             const imgHeight = canvas.height * imgWidth / canvas.width;
             const contentDataURL = canvas.toDataURL('image/png');
             const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
             const position = 5;
             pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
             pdf.addPage();
             pdf.save(pdfName); // Generated PDF
         });
   }

   downloadPdfAllStudents() {
       const doc = new jspdf('p', 'pt');
       let i = 1;
       let headerTop = 50;
       let startTable = 50;
       while (document.getElementById('tt' + i) !== null) {

           const header = function (data) {
               doc.setFontSize(18);
               doc.setTextColor(40);
               doc.setFontStyle('normal');
               doc.text(document.getElementById('st' + i).innerHTML + ' - ' +
                   document.getElementById('course' + i).innerHTML,
                   data.settings.margin.left, headerTop);
           };
           doc.autoTable({
               html: '#tt' + i,
               margin: {top: 80},
               startY: startTable,
               didDrawPage: header
           });

           if (i % 3 === 0  ) {
               doc.addPage();
               headerTop = 40;
               startTable = 50;
           } else {
               headerTop += 200;
               startTable += 205;
           }


           i++;

       }

       doc.save('table.pdf');
   }

  ngOnInit() {
    this.subjectsService.getStudents().
    subscribe(
      (response) => {
        Object.keys(response).forEach(key => {
          const value = response[key];
          const newStudent = new StudentModel(value.name, value.subjects, value.course, value.timeTable, value.nextWeekTimeTable);
          this.students.push(newStudent);
        });
      }
    );
  }

}
