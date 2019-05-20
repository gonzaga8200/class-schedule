import {Component, Input, OnInit} from '@angular/core';
import {SubjectsService} from '../../subjects.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-subjects-in-date',
  templateUrl: './subjects-in-date.component.html',
  styleUrls: ['./subjects-in-date.component.sass']
})
export class SubjectsInDateComponent implements OnInit {
  @Input() dateForSubjects;
  subjects: Observable<any>;


  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
    const newDate = new Date(this.dateForSubjects);
    this.subjects = this.subjectService.getSubjectsForJsonObservable(newDate);
  }

}
