import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { CountriesInterface } from '../../Interfaces/Country.interface'

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  // rootUrl = environment.API_URL
  allCountryAPI = environment.All_Country_With_TZ_API

  getAllCountry(): Observable<CountriesInterface> {
    return this.http.get<CountriesInterface>(this.allCountryAPI)
  }
}