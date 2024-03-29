import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../Interfaces/orderProcessing.interface';

@Injectable({
  providedIn: 'root',
})
export class SkeletonApiService {
  constructor(private http: HttpClient) { }

  rootUrl = environment.API_URL;

  login(
    email: string,
    password: string
  ): Observable<{ status: string; user: IUser }> {
    return this.http.post<{ status: string; user: IUser }>(
      this.rootUrl + '/auth/login',
      { email, password }
    );
  }

  getServicesForUser(): Observable<{ message: string[] }> {
    return this.http.get<{ message: string[] }>(
      this.rootUrl + '/auth/services'
    );
  }

  getRedirectUrl(
    service: string
  ): Observable<{ status: string; redirect: string }> {
    return this.http.get<{ status: string; redirect: string }>(
      this.rootUrl + '/service-auth/redirect/' + service
    );
  }


  getUserFromToken(): Observable<any> {
    return this.http.get<any>
      (this.rootUrl + '/service-auth/user-from-token');
  }

  checkInUser(employeeId: number, position: string): Observable<any> {
    return this.http.post<{ status: string }>(this.rootUrl + '/employee/check-in', { employeeId, position });
  }

  checkOutUser(employeeId: number, attendanceId: string, position: string): Observable<any> {
    return this.http.post<any>(this.rootUrl + '/employee/check-out', { employeeId, attendanceId, position });
  }

  private attendaceIdSubject = new BehaviorSubject<string | null>(null)


  getIsCheckedInData(): BehaviorSubject<string | null> {
    const storedAttendanceId = localStorage.getItem('attendanceId')
    this.attendaceIdSubject.next(storedAttendanceId)

    return this.attendaceIdSubject

  }

  setAttendanceId(newValue: string): void {
    localStorage.setItem('attendanceId', newValue);
    this.attendaceIdSubject.next(newValue);
  }

}
