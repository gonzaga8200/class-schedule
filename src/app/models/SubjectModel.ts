

export class SubjectModel {
    constructor (public name: String, public associatedClass: String) {
    }

    getSubjectClass () {
        return this.associatedClass;
    }
}
