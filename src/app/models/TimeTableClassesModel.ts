import {StudentModel} from './StudentModel';

export class TimeTableClassesModel {
    constructor(public firstHour: StudentModel [] | string,
                secondHour: StudentModel [] | string,
                thirdHour: StudentModel [] | string,
                fourHour: StudentModel[] | string,
                fifthHour: StudentModel[] | string,
                sixthHour: StudentModel [] | string) {

    }
}
