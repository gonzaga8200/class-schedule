import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from '../models/StudentModel';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {

  urlClassRoom =  'https://class-schedule-fd50c.firebaseio.com/classRooms';

  constructor(private http: HttpClient) { }

  getClassRooms() {
    return this.http.get(this.urlClassRoom + '.json');
  }


}
