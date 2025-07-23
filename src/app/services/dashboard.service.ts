import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculosAPI, Veiculo } from '../models/veiculo.model'; 
import { VehicleData } from '../models/vehicleData.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'https://api-ford-gqoj.onrender.com'

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VeiculosAPI>{
    return this.http.get<VeiculosAPI>(`${this.baseUrl}/vehicles`)
  }

  getVehicleData(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.baseUrl}/vehicleData`, { vin });
  }
}