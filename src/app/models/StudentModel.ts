import {SubjectModel} from './SubjectModel';


export class StudentModel {

    constructor (public name: string, public subjects: SubjectModel [], public course: string) {

    }

    getName() {
        return this.name;
    }

    getSubjects() {
        return this.subjects;
    }
}
