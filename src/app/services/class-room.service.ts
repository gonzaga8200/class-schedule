import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {

  urlClassRoom =  'https://class-schedule-fd50c.firebaseio.com/classRooms.json';
  objectKeys = Object.keys;

  constructor(private http: HttpClient) { }

  getClassRooms() {
    return this.http.get(this.urlClassRoom);
  }


}
