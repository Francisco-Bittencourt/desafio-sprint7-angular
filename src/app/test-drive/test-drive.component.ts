import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importe o Router
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Veiculo } from '../models/veiculo.model';

@Component({
  selector: 'app-test-drive',
  standalone: false,
  templateUrl: './test-drive.component.html',
  styleUrls: ['./test-drive.component.css'], // Corrigido para styleUrls (plural)
})
export class TestDriveComponent implements OnInit, OnDestroy {
  testDriveForm!: FormGroup;
  vehicles: Veiculo[] = [];
  formSubmitted: boolean = false;
  bookedName: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router, // Injetar o Router
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.testDriveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      termsAccepted: new FormControl(false, Validators.requiredTrue),
      privacyPolicyAccepted: new FormControl(false, Validators.requiredTrue),
      marketingConsent: new FormControl(false),
    });

    this.loadVehicles();
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
        },
      });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.cdr.detectChanges(); // Força a detecção de mudanças para exibir as mensagens de erro

    console.log('--- Tentativa de Envio do Formulário ---');
    console.log('Formulário Válido (testDriveForm.valid)?', this.testDriveForm.valid);
    console.log('Valores do Formulário:', this.testDriveForm.value);

    // Debug para verificar cada controle individualmente
    Object.keys(this.testDriveForm.controls).forEach(key => {
      const control = this.testDriveForm.get(key);
      if (control) {
        console.log(`Controle '${key}': Válido? ${control.valid}, Erros:`, control.errors);
      }
    });
    console.log('--- Fim da Verificação de Debug ---');

    if (this.testDriveForm.valid) {
      this.bookedName = this.testDriveForm.value.name;
      console.log('Formulário de Test-Drive enviado com sucesso!', this.testDriveForm.value);

      // Resetar o formulário e remover mensagens após 5 segundos
      setTimeout(() => {
        this.testDriveForm.reset();
        // Resetar os checkboxes para false explicitamente após o reset
        this.testDriveForm.get('termsAccepted')?.setValue(false);
        this.testDriveForm.get('privacyPolicyAccepted')?.setValue(false);
        this.testDriveForm.get('marketingConsent')?.setValue(false);
        
        this.formSubmitted = false;
        this.bookedName = '';
        this.cdr.detectChanges(); // Força a detecção novamente
      }, 5000);
    } else {
      console.warn('Formulário de Test-Drive inválido. Verifique os campos.');
      this.testDriveForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir erros
      this.cdr.detectChanges(); // Força a detecção novamente
    }
  }

  // Métodos de navegação para o Offcanvas (copiados do Dashboard/Home)
  toHome(): void {
    this.router.navigate(['/home']);
    // Fechar o offcanvas após navegação
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
    this.router.navigate(['/login']); // Exemplo de navegação para tela de login
    // Fechar o offcanvas
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }
}