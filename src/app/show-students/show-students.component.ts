import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {map, startWith} from 'rxjs/operators';
import {StudentModel} from '../models/StudentModel';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {SubjectModel} from '../models/SubjectModel';

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

    return this.students.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

    displayFn(student?: StudentModel): string | undefined {
        return student ? student.name : undefined;
    }

    callSomeFunction(student: StudentModel) {
      console.log(student.getSubjects());
      console.log(typeof this.studentCtrl.value);
      this.subjects = student.getSubjects();


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
