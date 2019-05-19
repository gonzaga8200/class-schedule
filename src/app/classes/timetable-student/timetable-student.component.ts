import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {StudentsService} from '../../services/students.service';

@Component({
  selector: 'app-timetable-student',
  templateUrl: './timetable-student.component.html',
  styleUrls: ['./timetable-student.component.sass']
})
export class TimetableStudentComponent implements OnInit {


    timeTableStudentRepresentationForm = [];
    studentForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<TimetableStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public studentService: StudentsService) {
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
        console.log('No hacer nada');
        this.dialogRef.close();

    }

    onSubmit() {
        console.log(this.studentForm.value);
        this.updateTimetableStudent(this.studentForm.value.keyStudent);
        this.dialogRef.close();
    }

    updateTimetableStudent(keyStudent: string) {
        this.studentService.setStudentTimeTable(keyStudent, this.studentForm.get('classRooms').value)
            .subscribe(
                response => console.log(response),
                       error => console.log(error)
            );
    }

    ngOnInit() {
        this.studentForm = new FormGroup({
            'keyStudent' : new FormControl(this.data.keyStudent),
            'classRooms': new FormArray([])
        });
        for (let i = 0; i < this.timeTableStudentRepresentationForm.length; i++) {
            const classRoom = new FormControl(this.timeTableStudentRepresentationForm[i].classRoomKeyStudent);
            (<FormArray>this.studentForm.get('classRooms')).push(classRoom);
        }

        console.log(this.studentForm.get('classRooms').value);
    }

}
