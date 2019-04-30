import {Component, Input, OnInit} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-subjects-selection',
  templateUrl: './subjects-selection.component.html',
  styleUrls: ['./subjects-selection.component.sass'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class SubjectsSelectionComponent implements OnInit {
  @Input() courses ;
  @Input() subjectsInDataBase;

  constructor() { }

  ngOnInit() {
  }

}
