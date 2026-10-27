import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadeDados } from '../cidade.model';

@Component({
  selector: 'app-cidade',
  standalone: false,
  templateUrl: './cidade.html',
  styleUrl: './cidade.css',
})
export class Cidade {
  formulario: FormGroup;
  cidades: CidadeDados[] = [];
  proximoId = 1;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      estado: ['', Validators.required],
      populacao: [0, [Validators.required, Validators.min(1)]],
      capital: [false],
    });
  }

  cadastrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const novaCidade: CidadeDados = {
      id: this.proximoId++,
      nome: this.formulario.value.nome,
      estado: this.formulario.value.estado,
      populacao: Number(this.formulario.value.populacao),
      capital: this.formulario.value.capital,
    };

    this.cidades.push(novaCidade);
    this.formulario.reset({
      nome: '',
      estado: '',
      populacao: 0,
      capital: false,
    });
  }
}
