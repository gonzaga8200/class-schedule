import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentsService} from '../services/students.service';
import {ClassRoomService} from '../services/class-room.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-next-week-class',
  templateUrl: './next-week-class.component.html',
  styleUrls: ['./next-week-class.component.sass']
})
export class NextWeekClassComponent implements OnInit, OnDestroy {
  classRoomsRepresentation = ['Ciencias', 'Trabajo', 'Ampliación', 'Letras', 'Idiomas'];
  hoursRepresentation = ['8:15 - 9:10', '9:10 - 10:05', '10:05 - 11:00', '11:30 - 12:25', '12:25 - 13:20', '13:20 - 14:15'];
  classRooms = {
    'sciences': {
      '17-6': {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': []
      },
      '18-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
       '19-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
       '20-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
        '21-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
        '22-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
    },
    'work': {
          '17-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '18-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '19-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '20-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '21-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
        '22-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
      },
    'extra': {
          '17-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '18-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '19-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '20-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '21-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
        '22-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
      },
    'literature': {
          '17-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '18-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '19-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '20-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '21-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
        '22-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
      },
    'languages': {
          '17-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '18-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '19-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '20-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
          '21-6': {
              '0': [],
              '1': [],
              '2': [],
              '3': [],
              '4': [],
              '5': []
          },
        '22-6': {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': []
        },
      }
  };
  students = this.studentService.getStudentArray();
  examDays = ['17-6', '18-6', '19-6', '20-6', '21-6'];
  classRoomsJson;
  launcherClassRoom = new Subject();

  constructor(private studentService: StudentsService, private classRoomsService: ClassRoomService) {
    this.studentService.getStudentArray()
        .subscribe(
            students => {
              this.classRoomsService.getClassRooms().subscribe(
                  classRooms => {
                    this.classRoomsJson = classRooms;
                  }
              )
              for (const student of students) {
                Object.keys(student.nextWeekTimeTable).forEach(date => {
                   for (let i = 0; i < student.nextWeekTimeTable[date].length; i++ ) {
                      console.log(student.name);
                      if (student.nextWeekTimeTable[date][i] !== 'Examen') {
                          this.classRooms[student.nextWeekTimeTable[date][i]][date][i].push(student);
                      }
                   }
                });
              }
              this.launcherClassRoom.next(Object.values(this.classRooms));
            }
        );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.launcherClassRoom.unsubscribe();
  }

}
