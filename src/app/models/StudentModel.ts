import {SubjectModel} from './SubjectModel';


export class StudentModel {
    constructor (public name: string, public subjects: SubjectModel []) {

    }
}
