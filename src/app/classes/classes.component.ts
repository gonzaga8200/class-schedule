import { Component, OnInit } from '@angular/core';
import {ClassRoomService} from '../services/class-room.service';
import {SubjectsService} from '../subjects.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.sass']
})
export class ClassesComponent implements OnInit {

  classRooms;
  classRoomsModel = ['sciences', 'literature', 'languages', 'extra', 'work'];
  hoursModel = ['firstHour', 'secondHour', 'thirdHour', 'fourthHour', 'fifthHour', 'sixthHour']

  constructor(private classRoomService: ClassRoomService, private subjectsService: SubjectsService) { }

  ngOnInit() {

    this.classRoomService.getClassRooms()
        .subscribe(
            response => {
              this.classRooms = response;
              Object.keys(this.classRooms).forEach(key => {
                  Object.keys(this.classRooms[key].timeTable).forEach(key2 => {
                      this.classRooms[key].timeTable[key2].students = [];
                  };
              })
              this.subjectsService.getStudents()
                  .subscribe(
                    students => {
                      Object.keys(students).forEach(student => {
                        console.log(this.classRooms);
                        console.log(students[student].timeTable);
                        Object.keys(students[student].timeTable).forEach(studentHour => {
                          const classRoom = students[student].timeTable[studentHour];
                          this.classRooms[classRoom].timeTable[studentHour].students.push(students[student].name);
                          console.log(this.classRooms[classRoom].timeTable[studentHour].students);
                        });
                      });
                    }
                  );
            }
        );


  }

}
