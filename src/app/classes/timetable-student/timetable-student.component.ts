import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-timetable-student',
  templateUrl: './timetable-student.component.html',
  styleUrls: ['./timetable-student.component.sass']
})
export class TimetableStudentComponent  {

    timeTableStudentRepresentationForm = [];
    selected;

    constructor(
        public dialogRef: MatDialogRef<TimetableStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            const dataResult = data;
            console.log(dataResult);
            Object.keys(dataResult.studentInfo.timeTable).forEach(key => {
                console.log(dataResult.studentInfo.timeTable[key]);
                this.timeTableStudentRepresentationForm.push(
                    {
                        'hour': dataResult.infoClass[dataResult.studentInfo.timeTable[key]].timeTable[key].hour,
                        'classRoom': dataResult.infoClass[dataResult.studentInfo.timeTable[key]].name,
                        'classRoomKeyStudent': dataResult.studentInfo.timeTable[key],
                        'hourKeyStudent': key,
                        'keyStudent': dataResult.keyStudent
                    }
                );
            });
            console.log(this.timeTableStudentRepresentationForm);

    }

    onNoClick(): void {
        console.log('click en .... que será ')
        this.dialogRef.close();

    }

}
