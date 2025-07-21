import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  formSubmitted: boolean = false;
  registeredName: string = '';
  cadastroSuccess: boolean = false;

  termsAndConditionsAccepted: boolean = false;
  privacyPolicyAccepted: boolean = false;
  termsError: string = '';

  userExistsError: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
     
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: matchPasswordsValidator() });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.cadastroSuccess = false;
    this.termsError = '';
    this.userExistsError = '';

    if (!this.termsAndConditionsAccepted || !this.privacyPolicyAccepted) {
      this.termsError = 'Você deve aceitar os Termos e Condições e a Política de Privacidade para realizar o cadastro.';
      console.warn('Cadastro negado: Termos não aceitos.');
      return;
    }

    if (this.cadastroForm.invalid) {
      console.warn('Formulário de cadastro inválido. Verifique os campos.');
      this.cadastroForm.markAllAsTouched();
      return;
    }

   
    const username = this.cadastroForm.value.name;
    const password = this.cadastroForm.value.password;

    const usersJson = localStorage.getItem('registeredUsers');
    let users: { username: string, password: string }[] = [];

    if (usersJson) {
      try {
        users = JSON.parse(usersJson);
      } catch (e) {
        console.error('Erro ao parsear usuários do localStorage:', e);
        users = [];
      }
    }


    const userAlreadyExists = users.some(user => user.username.toLowerCase() === username.toLowerCase());

    if (userAlreadyExists) {
      this.userExistsError = `O usuário(a) "${username}" já está cadastrado(a).`;
      console.warn(`Cadastro negado: Usuário "${username}" já existe.`);
      return;
    }

    users.push({ username: username, password: password });
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    this.registeredName = username;
    this.cadastroSuccess = true;

    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', 'true');

    console.log('Novo usuário cadastrado e lista atualizada no localStorage:');
    console.log(users);
  }

  irParaHome(): void {
    this.router.navigate(['/home']);
  }

  voltarParaLogin(): void {
    this.router.navigate(['/login']);
  }
}