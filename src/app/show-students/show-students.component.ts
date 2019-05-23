import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {map, startWith} from 'rxjs/operators';
import {StudentModel} from '../models/StudentModel';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {SubjectModel} from '../models/SubjectModel';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.sass']
})
export class ShowStudentsComponent implements OnInit {
  filteredStudents: Observable<StudentModel[]>;
  studentCtrl = new FormControl();
  students: StudentModel [] = [];
  subjects: SubjectModel [] = [];
  timeTable = [];


  constructor(private subjectsService: SubjectsService) {
    this.filteredStudents = this.studentCtrl.valueChanges
      .pipe(
          startWith<string | StudentModel>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterStudents(name) : this.students.slice())
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
      console.log(student.getSubjects());
      console.log(typeof this.studentCtrl.value);
      this.subjects = student.getSubjects();
      this.timeTable = Object.values(student.getTimeTable());


    }

   downloadPdf() {
       const data = document.getElementById('studentTimeTable');
         html2canvas(data).then(canvas => {
   // Few necessary setting options
             const imgWidth = 208;
             const pageHeight = 295;
             const imgHeight = canvas.height * imgWidth / canvas.width;
             const heightLeft = imgHeight;

             const contentDataURL = canvas.toDataURL('image/png')
             const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
             const position = 0;
             pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
             pdf.save('MYPdf.pdf'); // Generated PDF
         });
   }

  ngOnInit() {
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

}
