

export class SubjectModel {
    constructor (public idSubject: string, public name: String, public associatedClass: String, public course: String, public date: string) {
    }

    getSubjectClass () {
        return this.associatedClass;
    }
}
