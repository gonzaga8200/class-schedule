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
    'Examen': {
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
  classRoomsJson = this.classRoomsService.getClassRooms();
  launcherClassRoom = new Subject();

  constructor(private studentService: StudentsService, private classRoomsService: ClassRoomService) {
    this.studentService.getStudentArray()
        .subscribe(
            students => {
              for (const student of students) {
                Object.keys(student.nextWeekTimeTable).forEach(date => {
                   for (let i = 0; i < student.nextWeekTimeTable[date].length; i++ ) {
                      console.log(student.name);
                      this.classRooms[student.nextWeekTimeTable[date][i]][date][i].push(student.name);
                   }
                });
              }
              this.launcherClassRoom.next(Object.keys(this.classRooms));
            }
        );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.launcherClassRoom.unsubscribe();
  }

}
