import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  urlSubjects =  'https://class-schedule-fd50c.firebaseio.com/subjects.json';

  constructor(private http: HttpClient) { }

  getSubjects() {
  }

  getSubjectsForJson() {
      /*const result = this.http.get(this.urlSubjects).subscribe(
          (response) => {
              Object.keys(response).forEach(key => {
                  const value = response[key];
                  console.log(value.name);
              });
          }
      );
      console.log(result);
      return result;*/

      return this.http.get(this.urlSubjects);

  }
}
