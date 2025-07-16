import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Veiculo } from '../models/veiculo.model';

@Component({
  selector: 'app-test-drive',
  standalone: false,
  templateUrl: './test-drive.component.html',
  styleUrls: ['./test-drive.component.css'],
})
export class TestDriveComponent implements OnInit, OnDestroy {
  testDriveForm!: FormGroup;
  vehicles: Veiculo[] = [];
  formSubmitted: boolean = false;
  bookedName: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.testDriveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
      // NOVOS CONTROLES DE FORMULÁRIO PARA DATA E HORA
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      // FIM DOS NOVOS CONTROLES
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
    this.cdr.detectChanges();

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

    if (this.testDriveForm.valid) {
      this.bookedName = this.testDriveForm.value.name;
      console.log('Formulário de Test-Drive enviado com sucesso!', this.testDriveForm.value);

      setTimeout(() => {
        this.testDriveForm.reset();
        this.formSubmitted = false;
        this.bookedName = '';
        this.cdr.detectChanges();
      }, 5000);
    } else {
      console.warn('Formulário de Test-Drive inválido. Verifique os campos.');
      this.testDriveForm.markAllAsTouched();
      this.cdr.detectChanges();
    }
  }
}