

export class SubjectModel {
    constructor (public idSubject: string, public name: String, public associatedClass: String, course: String) {
    }

    getSubjectClass () {
        return this.associatedClass;
    }
}
