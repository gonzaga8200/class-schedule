import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../subjects.service';
import {StudentModel} from '../models/StudentModel';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-exam-subjects',
  templateUrl: './exam-subjects.component.html',
  styleUrls: ['./exam-subjects.component.sass']
})
export class ExamSubjectsComponent implements OnInit {
  subjects: Observable<any>;
  datesSubjects: Observable<any>;

  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
    this.datesSubjects = this.subjectService.getDatesSubjects();
  }

  removeStudentsSubject(date: number) {
      this.subjectService.setWeekTimeTable(date);

  }

}
