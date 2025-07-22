
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
  showSuccessMessage: boolean = false;
  private destroy$ = new Subject<void>();
  minSelectableDate: string; 
  minTime: string = '06:00';
  maxTime: string = '23:00';
  bookedName: string = '';
  bookedTime: string = '';
  bookedDate: string = '';

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    this.minSelectableDate = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.testDriveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required, this.dateNotBeforeTomorrowValidator()]),
      time: new FormControl('', [Validators.required, this.timeRangeValidator()]),
    });

    this.loadVehicles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dateNotBeforeTomorrowValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }
      const selectedDateString = control.value; 
     
      if (selectedDateString < this.minSelectableDate) {
        return { 'dateBeforeTomorrow': true };
      }
      return null;
    };
  }

  timeRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const timeString = control.value;
      const [hours, minutes] = timeString.split(':').map(Number);

      const totalMinutes = hours * 60 + minutes;

      const minMinutes = 6 * 60;
      const maxMinutes = 23 * 60;

      if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
        return { 'timeInvalid': true };
      }
      return null;
    };
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
    this.showSuccessMessage = false;
    this.cdr.detectChanges();


    Object.keys(this.testDriveForm.controls).forEach(key => {
      const control = this.testDriveForm.get(key);
      if (control) {
        console.log(`Controle '${key}': Válido? ${control.valid}, Erros:`, control.errors);
      }
    });
    console.log('--- Fim da Verificação de Debug ---');

    if (this.testDriveForm.valid) {
      this.bookedName = this.testDriveForm.value.name;
      this.bookedTime = this.testDriveForm.value.time;
      this.bookedDate = this.testDriveForm.value.date;
      this.showSuccessMessage = true;
      console.log('Formulário de Test-Drive enviado com sucesso!', this.testDriveForm.value);

      this.testDriveForm.reset();
   
      this.formSubmitted = false;
      this.cdr.detectChanges();
    } else {
      console.warn('Formulário de Test-Drive inválido. Verifique os campos.');
      this.testDriveForm.markAllAsTouched();
      this.cdr.detectChanges();
    }
  }

  dismissSuccessMessage(): void {
    this.showSuccessMessage = false;
    this.bookedName = '';
    this.bookedTime = '';
    this.bookedDate = '';
    this.formSubmitted = false;
    this.cdr.detectChanges();
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
}
