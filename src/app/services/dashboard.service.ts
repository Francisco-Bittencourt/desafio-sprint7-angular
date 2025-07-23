import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculosAPI, Veiculo } from '../models/veiculo.model'; 
import { VehicleData } from '../models/vehicleData.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.production';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VeiculosAPI>{
    return this.http.get<VeiculosAPI>(`${this.baseUrl}/vehicles`)
  }

  getVehicleData(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.baseUrl}/vehicleData`, { vin });
  }
}