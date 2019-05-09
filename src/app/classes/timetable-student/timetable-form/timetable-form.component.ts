import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timetable-form',
  templateUrl: './timetable-form.component.html',
  styleUrls: ['./timetable-form.component.sass']
})
export class TimetableFormComponent implements OnInit {

  @Input() hoursStudent;

  constructor() { }

  ngOnInit() {
  }

}
