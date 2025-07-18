// src/app/comparacao-veiculos/comparacao.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Interface para definir a estrutura de um carro
interface Car {
  nome: string;
  preco: number;
  alturaCacamba: number; // Para SUVs/Carros, considere 0 ou altura relevante do compartimento
  alturaVeiculo: number;
  alturaSolo: number;
  capacidadeCarga: number; // Para SUVs/Carros, considere capacidade de carga útil em Kg
  motor: number | string; // Pode ser 2.0, 5.0 V8, etc.
  potencia: number;
  volumeCacamba: number; // Para SUVs/Carros, considere volume do porta-malas em Litros
  roda: string;
  image: string;
  vin: string; // Número de Identificação do Veículo (VIN)
  // NOVAS PROPRIEDADES ADICIONADAS
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: "on" | "off";
  lat: number;
  long: number;
}

@Component({
  selector: 'app-comparacao-veiculos',
  standalone: false,
  templateUrl: './comparacao.component.html',
  styleUrls: ['./comparacao.component.css']
})
export class ComparacaoComponent implements OnInit {

  selectedCarsForComparison: Car[] = [];
  showCompareModal: boolean = false;
  message: string | null = null;

  // Dados dos carros (atualizados com informações pesquisadas, caminhos de imagem mantidos e novos dados)
  cars: Car[] = [
    {
      id: 1, // ID de exemplo
      nome: 'Ford Bronco Sport Wildtrak 2.0 EcoBoost 2022',
      preco: 203833,
      alturaCacamba: 0,
      alturaVeiculo: 1813,
      alturaSolo: 223,
      capacidadeCarga: 482,
      motor: 2.0,
      potencia: 253,
      volumeCacamba: 482,
      roda: 'Liga Leve 17',
      image: '/img/broncoSport.png',
      vin: '1FMDJ7B2XNGA12345',
      odometro: 23344, // Dados de exemplo
      nivelCombustivel: 76, // Dados de exemplo
      status: "on", // Dados de exemplo
      lat: -12.2322, // Dados de exemplo
      long: -35.2314 // Dados de exemplo
    },
    {
      id: 2, // ID de exemplo
      nome: 'Ford Mustang Mach 1 5.0 V8 2022',
      preco: 483000,
      alturaCacamba: 0,
      alturaVeiculo: 1379,
      alturaSolo: 130,
      capacidadeCarga: 402,
      motor: '5.0 V8',
      potencia: 483,
      volumeCacamba: 382,
      roda: 'Liga Leve 19',
      image: '/img/mustang.png',
      vin: '1FAHP2F2XNGA67890',
      odometro: 15678, // Dados de exemplo
      nivelCombustivel: 85, // Dados de exemplo
      status: "on", // Dados de exemplo
      lat: -12.5678, // Dados de exemplo
      long: -35.9876 // Dados de exemplo
    },
    {
      id: 3, // ID de exemplo
      nome: 'Ford Ranger XLS 2.2 Diesel 4X4 AT CD 2022',
      preco: 158365,
      alturaCacamba: 511,
      alturaVeiculo: 1821,
      alturaSolo: 235,
      capacidadeCarga: 1100,
      motor: 2.2,
      potencia: 160,
      volumeCacamba: 1250,
      roda: 'Liga Leve 16',
      image: '/img/ranger.png',
      vin: '3FMPU7A2XNGA11223',
      odometro: 45123, // Dados de exemplo
      nivelCombustivel: 60, // Dados de exemplo
      status: "on", // Dados de exemplo
      lat: -13.1122, // Dados de exemplo
      long: -36.4455 // Dados de exemplo
    },
    {
      id: 4, // ID de exemplo
      nome: 'Ford Territory Titanium 1.5 EcoBoost 2022',
      preco: 216120,
      alturaCacamba: 0,
      alturaVeiculo: 1674,
      alturaSolo: 190,
      capacidadeCarga: 420,
      motor: 1.5,
      potencia: 150,
      volumeCacamba: 420,
      roda: 'Liga Leve 18',
      image: '/img/territory.png',
      vin: 'LSJBP7B2XNGA44556',
      odometro: 18901, // Dados de exemplo
      nivelCombustivel: 92, // Dados de exemplo
      status: "off", // Dados de exemplo
      lat: -12.8765, // Dados de exemplo
      long: -35.1234 // Dados de exemplo
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('Página de Comparação de Veículos carregada.');
  }

  isCarSelected(car: Car): boolean {
    return this.selectedCarsForComparison.some(c => c.nome === car.nome);
  }

  setCarToCompare(event: Event, car: Car): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (this.selectedCarsForComparison.length >= 4) {
        this.showMessage("Você só pode comparar até 4 carros por vez.");
        checkbox.checked = false;
        return;
      }
      if (!this.isCarSelected(car)) {
        this.selectedCarsForComparison.push(car);
      }
    } else {
      this.selectedCarsForComparison = this.selectedCarsForComparison.filter(c => c.nome !== car.nome);
    }
  }

  showCompare(): void {
    if (this.selectedCarsForComparison.length < 2) {
      this.showMessage("Selecione pelo menos 2 carros para comparar.");
      return;
    }
    this.showCompareModal = true;
  }

  hideCompare(): void {
    this.showCompareModal = false;
    this.message = null;
  }

  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToTestDrive(): void {
    this.router.navigate(['/test-drive']);
  }
}
