

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${code}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Trip>(this.apiUrl, trip, { headers });
  }

  updateTrip(code: string, trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Trip>(`${this.apiUrl}/${code}`, trip, { headers });
  }
}