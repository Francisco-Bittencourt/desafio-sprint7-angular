// src/app/dashboard/dashboard.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Veiculo, VeiculosAPI } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicleData.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  vehicleData: VehicleData | null = null;

  totalSales: number = 0;
  connectedVehicles: number = 0;
  softwareUpdates: number = 0;

  selectCarForms = new FormGroup({
    carId: new FormControl<string | null>(''),
    vin: new FormControl<string | null>(''),
  });

  private destroy$ = new Subject<void>();

  constructor(private dashboardservice: DashboardService, private router: Router) {} // Injetar o Router

  ngOnInit(): void {
    this.loadVehicles();

    this.selectCarForms.controls.carId.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: string | null) => {
        if (id) {
          this.selectedVehicle = this.vehicles.find((v) => v.id == id) || null;
          if (this.selectedVehicle) {
            this.totalSales = Number(this.selectedVehicle.volumetotal);
            this.connectedVehicles = Number(this.selectedVehicle.connected);
            this.softwareUpdates = Number(this.selectedVehicle.softwareUpdates);
          } else {
            this.totalSales = 0;
            this.connectedVehicles = 0;
            this.softwareUpdates = 0;
            this.clearVehicleData();
          }
        } else {
          this.selectedVehicle = null;
          this.totalSales = 0;
          this.connectedVehicles = 0;
          this.softwareUpdates = 0;
          this.clearVehicleData();
        }
      });

    this.selectCarForms.controls.vin.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((vin: string | null) => {
        if (vin && this.selectCarForms.controls.carId.value) {
          this.selectCarForms.controls.carId.setValue('', { emitEvent: false });
          this.clearVehicleData();
        } else if (!vin && !this.selectCarForms.controls.carId.value) {
          this.clearVehicleData();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadVehicles(): void {
    this.dashboardservice
      .getVehicles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: VeiculosAPI) => {
          console.log('Resposta da API de veículos:', res);
          this.vehicles = res.vehicles;
        },
        error: (err) => {
          console.error('Erro ao carregar veículos:', err);
        },
      });
  }

  loadVehicleDetails(): void {
    const vin = this.selectCarForms.controls.vin.value;

    if (vin) {
      console.log('Buscando dados para o VIN:', vin);
      this.clearVehicleData(); 
      
      this.dashboardservice
        .getVehicleData(vin)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: VehicleData) => {
            console.log('Detalhes do veículo carregados:', res);
            this.vehicleData = res;
          },
          error: (err) => {
            console.error('Erro ao carregar detalhes do veículo:', err);
            this.vehicleData = null;
          },
        });
    } else {
      console.warn('VIN não disponível para carregar dados do veículo.');
      this.clearVehicleData();
    }
  }

 
  toHome(): void {
    this.router.navigate(['/home']);
    
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }

  
  toLogout(): void {
    console.log('Logout clicado! Implemente sua lógica de logout aqui.');
   
    this.router.navigate(['/login']); 
    
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }

  private clearVehicleData(): void {
    this.vehicleData = null;
  }
}