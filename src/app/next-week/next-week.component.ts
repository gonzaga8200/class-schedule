import { Component, OnInit } from '@angular/core';
import {StudentsService} from '../services/students.service';
import {ClassRoomService} from '../services/class-room.service';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.sass']
})
export class NextWeekComponent implements OnInit {
  students = this.studentService.getStudentArray();
  examDays = ['17-6', '18-6', '19-6', '20-6', '21-6'];
  classRooms;


  constructor(private studentService: StudentsService, private classRoomsService: ClassRoomService) {
    this.classRoomsService.getClassRooms().
      subscribe(
        classRooms => {
          this.classRooms = classRooms;
        }
    );
  }

    downloadPdfAllStudents() {
        const doc = new jspdf('p', 'pt');
        let i = 1;
        let headerTop = 50;
        let startTable = 50;
        while (document.getElementById('tt' + i) !== null) {

            const header = function (data) {
                doc.setFontSize(18);
                doc.setTextColor(40);
                doc.setFontStyle('normal');
                doc.text(document.getElementById('st' + i).innerHTML,
                    data.settings.margin.left, headerTop);
            };
            doc.autoTable({
                html: '#tt' + i,
                margin: {top: 80},
                startY: startTable,
                didDrawPage: header
            });

            if (i % 3 === 0  ) {
                doc.addPage();
                headerTop = 40;
                startTable = 50;
            } else {
                headerTop += 200;
                startTable += 205;
            }


            i++;

        }

        doc.save('table.pdf');
    }

  ngOnInit() {
  }


}
