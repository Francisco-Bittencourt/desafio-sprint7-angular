// src/app/cadastro/cadastro.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
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

    // --- ADICIONADO: SALVAR O NOME DE USUÁRIO NO LOCALSTORAGE APÓS O CADASTRO ---
    localStorage.setItem('username', username); // O HomeComponent espera por 'username'
    localStorage.setItem('isLoggedIn', 'true'); // Manter também para uma verificação mais robusta
    // --- FIM ADICIONADO ---

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
