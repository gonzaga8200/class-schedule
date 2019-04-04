import {Component, OnInit, ViewChild} from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {FormControl, NgForm} from '@angular/forms';
import {StudentModel} from '../models/StudentModel';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SubjectModel} from '../models/SubjectModel';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  subjectsInDataBase: SubjectModel [] = [];
  @ViewChild('f') signUpForm: NgForm;
  defaultSubject = false;
  students: StudentModel [] = [];
  myControl = new FormControl();
  filteredStudents: Observable<StudentModel[]>;
  studentCtrl = new FormControl();

  constructor(private subjectsService: SubjectsService) {
      this.filteredStudents = this.studentCtrl.valueChanges
          .pipe(
              startWith(''),
              map(student => student ? this._filterStudents(student) : this.students.slice())
          );
  }

    private _filterStudents(value: string): StudentModel[] {
        const filterValue = value.toLowerCase();

        return this.students.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
    }

  ngOnInit() {
      this.subjectsService.getSubjectsForJson().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const subject = new SubjectModel(value.name, value.associatedClass);
                  this.subjectsInDataBase.push(subject);
              });
          }
      );
      this.subjectsService.getStudents().
        subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  const newStudent = new StudentModel(value.name, value.subjects);
                  this.students.push(newStudent);
              })
              console.log(this.students);
          }
      )
  }

  onSubmit() {


      const subjects: SubjectModel [] = [];
      Object.keys(this.signUpForm.value.subjectsData).forEach(key => {
          const value = this.signUpForm.value.subjectsData[key];
          if (value) {
              const subject = new SubjectModel(value.name, value.associatedClass);
              subjects.push(subject);
          }
      });
      console.log(subjects);
      const newStudent = new StudentModel (this.signUpForm.value.student, subjects);
      console.log(newStudent);
      this.subjectsService.addNewStudent (newStudent).
        subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );

  }

}
