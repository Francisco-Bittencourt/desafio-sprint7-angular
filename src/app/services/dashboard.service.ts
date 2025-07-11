import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculosAPI, Veiculo } from '../models/veiculo.model'; // Mantenha VeiculosAPI e Veiculo
import { Observable } from 'rxjs';

// Adicione a interface VehicleData aqui, já que não quer mexer no models
// Ou crie um novo arquivo models/vehicle-data.model.ts apenas para ela.
export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3001'

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VeiculosAPI>{
    // Este método busca a lista de veículos, que vem dentro de um objeto { vehicles: [...] }
    return this.http.get<VeiculosAPI>(`${this.baseUrl}/vehicles`)
  }

  // --- NOVO MÉTODO: Para buscar os dados detalhados do veículo ---
  getVehicleData(vin: string): Observable<VehicleData> {
    // Este método envia um POST com o VIN e espera um objeto VehicleData como resposta
    return this.http.post<VehicleData>(`${this.baseUrl}/vehicleData`, { vin });
  }
}