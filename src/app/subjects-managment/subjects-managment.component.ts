import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../students/students.component';
import {SubjectsService} from '../subjects.service';

@Component({
  selector: 'app-subjects-managment',
  templateUrl: './subjects-managment.component.html',
  styleUrls: ['./subjects-managment.component.sass']
})
export class SubjectsManagmentComponent implements OnInit {

  subjectForm: FormGroup;
    signUpForm: FormGroup;

    courses: Course[] = [
        {value: '1eso', viewValue: '1º ESO'},
        {value: '2eso', viewValue: '2º ESO'},
        {value: '3eso', viewValue: '3º ESO'},
        {value: '4eso', viewValue: '4º ESO'},
        {value: 'pmar1', viewValue: 'PMAR 1'},
        {value: 'pmar2', viewValue: 'PMAR 2'},
        {value: 'aulaEnlace', viewValue: 'Aula de Enlace'}
    ];

  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
    this.subjectForm = new FormGroup({
        'keySubject': new FormControl('', Validators.required),
        'subjectInfo': new FormGroup({
            'name': new FormControl(null, Validators.required),
            'associatedClass': new FormControl(null, Validators.required),
            'date': new FormControl(null, Validators.required),
            'course': new FormControl(null, Validators.required),
        })
    });

      /*this.signUpForm = new FormGroup({
          'userData': new FormGroup({
              'username' : new FormControl(null, Validators.required),
              'email' : new FormControl(null, [Validators.required, Validators.email]),
          }),
          'gender': new FormControl('male')
      });*/
  }

  onSubmit() {
    console.log(this.subjectForm);
    this.subjectService.addNewSubject(this.subjectForm.value.keySubject, this.subjectForm.value.subjectInfo)
        .subscribe(
            response => console.log('response')
        );
  }

}
