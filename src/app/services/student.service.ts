import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentServices {

  private baseurl = 'https://localhost:7134/api/Student';

  constructor(private http: HttpClient) {}

  getAllStudent(): Observable<any> {
    return this.http.get<any>(this.baseurl);
  }

  addStudent(data: student): Observable<any> {
    return this.http.post<any>(this.baseurl, data);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/${id}`);
  }

updateByMarks(marks: number, data: student): Observable<any> {
  return this.http.put<any>(
    `${this.baseurl}/UpdateByMarks/${marks}`,
    data
  );
}

 deletestudentById(id: number): Observable<any> {
  return this.http.delete<any>(
    `${this.baseurl}/DeleteById/${id}`
  );
  }
}