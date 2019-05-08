import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StudentModel} from '../../models/StudentModel';

@Component({
  selector: 'app-timetable-student',
  templateUrl: './timetable-student.component.html',
  styleUrls: ['./timetable-student.component.sass']
})
export class TimetableStudentComponent  {

    constructor(
        public dialogRef: MatDialogRef<TimetableStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: StudentModel) {
            const dataResult = data;
            Object.keys(dataResult.timeTable).forEach(key => {
                console.log(key);
            });

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
