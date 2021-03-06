import {SubjectModel} from './SubjectModel';
import {TimeTableClassesModel} from './TimeTableClassesModel';


export class StudentModel {

    constructor (public name: string, public subjects: SubjectModel [], public course: string, public timeTable: TimeTableClassesModel, public nextWeekTimeTable: {}) {

    }

    getName() {
        return this.name;
    }

    getSubjects() {
        return this.subjects;
    }

    getTimeTable() {
        return this.timeTable;
    }

}
