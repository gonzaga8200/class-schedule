import {TimeTableClassesModel} from './TimeTableClassesModel';


export class ClassModel {
    constructor (public idClass: String, public limit: String, public timeTable: TimeTableClassesModel) {

    }
}
