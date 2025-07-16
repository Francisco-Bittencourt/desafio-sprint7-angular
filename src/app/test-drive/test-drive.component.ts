// src/app/test-drive/test-drive.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // Importar ChangeDetectorRef
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Veiculo } from '../models/veiculo.model';

@Component({
  selector: 'app-test-drive',
  standalone: false,
  templateUrl: './test-drive.component.html',
  styleUrls: ['./test-drive.component.css'], // Usando styleUrls para múltiplos arquivos CSS, se necessário
})
export class TestDriveComponent implements OnInit, OnDestroy {
  testDriveForm!: FormGroup;
  vehicles: Veiculo[] = [];
  formSubmitted: boolean = false;
  bookedName: string = ''; // Nova propriedade para armazenar o nome da pessoa agendada
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef // Injetar ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.testDriveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]), // Corrigido: Removido o 'new' duplicado
      phone: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
      termsAccepted: new FormControl(false, Validators.requiredTrue),
      privacyPolicyAccepted: new FormControl(false, Validators.requiredTrue),
      marketingConsent: new FormControl(false), // Opcional
    });

    this.loadVehicles(); // Carregar a lista de veículos ao iniciar o componente
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadVehicles(): void {
    this.dashboardService
      .getVehicles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.vehicles = res.vehicles;
          console.log('Veículos carregados para o Test-Drive:', this.vehicles);
        },
        error: (err) => {
          console.error('Erro ao carregar veículos para o Test-Drive:', err);
          // Este é o erro que você viu na imagem. Precisamos resolver a causa dele.
          // Verifique se a sua API está rodando e acessível em http://localhost:3001/vehicles
        },
      });
  }

  onSubmit(): void {
    this.formSubmitted = true; // Define como true quando o formulário é submetido
    this.cdr.detectChanges(); // Força a detecção de mudanças para que o *ngIf seja reavaliado imediatamente

    // --- LINHAS DE DEBUG (MANTIDAS PARA REFERÊNCIA) ---
    console.log('--- Tentativa de Envio do Formulário ---');
    console.log('Formulário Válido (testDriveForm.valid)?', this.testDriveForm.valid);
    console.log('Valores do Formulário:', this.testDriveForm.value);

    Object.keys(this.testDriveForm.controls).forEach(key => {
      const control = this.testDriveForm.get(key);
      if (control) {
        console.log(`Controle '${key}': Válido? ${control.valid}, Erros:`, control.errors);
      }
    });
    console.log('--- Fim da Verificação de Debug ---');
    // --- FIM DAS LINHAS DE DEBUG ---

    if (this.testDriveForm.valid) {
      this.bookedName = this.testDriveForm.value.name; // Armazena o nome da pessoa
      console.log('Formulário de Test-Drive enviado com sucesso!', this.testDriveForm.value);

      // A mensagem de sucesso agora deve aparecer porque formSubmitted é true e o formulário é válido.
      // O reset do formulário e a limpeza da mensagem serão feitos após um pequeno atraso.
      setTimeout(() => {
        this.testDriveForm.reset(); // Resetar o formulário APÓS a mensagem ter sido exibida
        this.formSubmitted = false; // Esconder a mensagem
        this.bookedName = ''; // Limpar o nome
        this.cdr.detectChanges(); // Forçar detecção de mudanças após resetar e limpar
      }, 5000); // Mensagem visível por 5 segundos
    } else {
      console.warn('Formulário de Test-Drive inválido. Verifique os campos.');
      // Marcar todos os campos como "touched" para exibir mensagens de erro
      this.testDriveForm.markAllAsTouched();
      this.cdr.detectChanges(); // Forçar detecção de mudanças para exibir mensagens de erro
    }
  }
}
