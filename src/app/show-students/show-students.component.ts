import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {map, startWith} from 'rxjs/operators';
import {StudentModel} from '../models/StudentModel';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.sass']
})
export class ShowStudentsComponent implements OnInit {
  filteredStudents: Observable<StudentModel[]>;
  studentCtrl = new FormControl();
  students: StudentModel [] = [];


  constructor(private subjectsService: SubjectsService) {
    this.filteredStudents = this.studentCtrl.valueChanges
      .pipe(
        startWith(''),
        map(student => student ? this._filterStudents(student) : this.students.slice())
      );
  }

  private _filterStudents(value: string): StudentModel[] {
    const filterValue = value ? value.toLowerCase() : '';

    return this.students.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.subjectsService.getStudents().
    subscribe(
      (response) => {
        Object.keys(response).forEach(key => {
          const value = response[key];
          const newStudent = new StudentModel(value.name, value.subjects);
          this.students.push(newStudent);
        });
      }
    );
  }

}
