// src/app/dashboard/dashboard.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core'; // Adicionado OnDestroy
import { DashboardService } from '../services/dashboard.service';
import { Veiculo, VeiculosAPI } from '../models/veiculo.model'; // Importe VeiculosAPI também
import { VehicleData } from '../models/vehicleData.model'; // Importe VehicleData do seu modelo
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs'; // Adicionado Subject e takeUntil para gerenciar inscrições

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy { // Implementa OnDestroy
  // Removendo currentImage, nextImage, prevImage pois não são usados no contexto
  // currentImage: any;
  // nextImage() { throw new Error('Method not implemented.'); }
  // prevImage() { throw new Error('Method not implemented.'); }

  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null; // Inicializado como null
  vehicleData: VehicleData | null = null; // Inicializado como null

  // Variáveis para os cards de resumo
  totalSales: number = 0;
  connectedVehicles: number = 0;
  softwareUpdates: number = 0;

  selectCarForms = new FormGroup({
    carId: new FormControl<string | null>('') // Tipo explícito para FormControl
  });

  private destroy$ = new Subject<void>(); // Usado para cancelar todas as inscrições

  constructor(private dashboardservice: DashboardService) { }

  ngOnInit(): void {
    // 1. Carregar a lista de veículos ao iniciar o componente
    this.loadVehicles();

    // 2. Observar mudanças no dropdown de seleção de veículo
    this.selectCarForms.controls.carId.valueChanges
      .pipe(takeUntil(this.destroy$)) // Garante que a inscrição será cancelada ao destruir o componente
      .subscribe((id: string | null) => { // id pode ser string ou null
        if (id) { // Se um ID válido (não vazio) foi selecionado
          // Encontra o veículo selecionado na lista 'vehicles'
          // Usamos '==' para comparar, pois 'id' pode ser string e 'vehicle.id' pode ser number
          this.selectedVehicle = this.vehicles.find(v => v.id == id) || null;

          if (this.selectedVehicle) {
            // Atualiza os dados dos cards com base no veículo selecionado
            // Usamos Number() para garantir que os valores são tratados como números
            this.totalSales = Number(this.selectedVehicle.volumetotal);
            this.connectedVehicles = Number(this.selectedVehicle.connected);
            this.softwareUpdates = Number(this.selectedVehicle.softwareUpdates);

            // --- PONTO CRÍTICO: Mapeamento do ID para o VIN ---
            // Sua API de detalhes (vehicleData) espera um VIN.
            // A API de lista de veículos (vehicles) NÃO te dá o VIN.
            // Então, precisamos fazer um "de/para" aqui.
            let vinToFetch = '';
            switch(this.selectedVehicle.id) {
                case 1: vinToFetch = '2FRHDUYS2Y63NHD22454'; break; // Ranger
                case 2: vinToFetch = '2RFAASDY54E4HDU34874'; break; // Mustang
                case 3: vinToFetch = '2FRHDUYS2Y63NHD22455'; break; // Territory
                case 4: vinToFetch = '2RFAASDY54E4HDU34875'; break; // Bronco Sport
                case 5: vinToFetch = '2FRHDUYS2Y63NHD22654'; break; // Exemplo para ID 5
                case 6: vinToFetch = '2FRHDUYS2Y63NHD22854'; break; // Exemplo para ID 6
                // Adicione mais casos se tiver mais veículos na sua API
                default: vinToFetch = ''; // Se nenhum VIN correspondente for encontrado
            }

            // Se encontrarmos um VIN, chamamos a função para carregar os detalhes
            if (vinToFetch) {
                this.loadVehicleDetails(vinToFetch);
            } else {
                this.clearVehicleData(); // Se não tiver VIN, limpa os detalhes
            }
          } else {
            this.clearVehicleData(); // Se o veículo não for encontrado, limpa tudo
          }
        } else {
          this.clearVehicleData(); // Se "Selecione um veículo" for escolhido (id é null ou vazio)
        }
      });
  }

  // Método que é chamado quando o componente está prestes a ser destruído
  ngOnDestroy(): void {
    this.destroy$.next(); // Emite um valor para indicar que o componente está sendo destruído
    this.destroy$.complete(); // Completa o Subject, cancelando todas as inscrições
  }

  // Função para carregar a lista de veículos da API
  loadVehicles(): void {
    this.dashboardservice.getVehicles() // Chama o método getVehicles do seu serviço
      .pipe(takeUntil(this.destroy$)) // Ajuda na limpeza de memória
      .subscribe({ // Se "inscreve" para receber a resposta da API
        next: (res) => { // A resposta da sua API é { vehicles: [...] }
          console.log('Resposta da API de veículos:', res);
          this.vehicles = res.vehicles; // Atribui o array de veículos à sua variável 'vehicles'
        },
        error: (err) => { // Se der erro na requisição
          console.error('Erro ao carregar veículos:', err);
          // Opcional: exibir uma mensagem de erro para o usuário na interface
        }
      });
  }

  // Função para carregar os detalhes de um veículo específico
  loadVehicleDetails(vin: string): void {
    this.dashboardservice.getVehicleData(vin) // Chama o método getVehicleData do seu serviço
      .pipe(takeUntil(this.destroy$)) // Ajuda na limpeza de memória
      .subscribe({
        next: (res: VehicleData) => { // A resposta já é o objeto VehicleData
          console.log('Detalhes do veículo carregados:', res);
          this.vehicleData = res; // Atribui os detalhes do veículo à sua variável 'vehicleData'
        },
        error: (err) => { // Se der erro
          console.error('Erro ao carregar detalhes do veículo:', err);
          this.vehicleData = null; // Limpa os detalhes em caso de erro
          // Opcional: exibir uma mensagem de erro para o usuário na interface
        }
      });
  }

  // Função auxiliar para limpar todos os dados exibidos no dashboard
  private clearVehicleData(): void {
    this.selectedVehicle = null;
    this.vehicleData = null;
    this.totalSales = 0;
    connectedVehicles: 0;
    this.softwareUpdates = 0;
  }
}