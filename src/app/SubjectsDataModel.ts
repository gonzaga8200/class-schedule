import {SingleSubjectModel} from './SingleSubjectModel';

export class SubjectsDataModel {
    constructor(public idSubject: String, public subjectInfo: SingleSubjectModel ) {

    }

    getSubjectClass() {
        return this.subjectInfo.associatedClass.name;
    }
}
