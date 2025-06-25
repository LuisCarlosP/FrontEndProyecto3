import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategoria } from '../../../interfaces'; 

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() categoriaForm!: FormGroup;
  @Output() callSaveMethod = new EventEmitter<ICategoria>();
  @Output() callUpdateMethod = new EventEmitter<ICategoria>();

  callSave() {
    const categoria: ICategoria = {
      nombre: this.categoriaForm.controls['nombre'].value,
      descripcion: this.categoriaForm.controls['descripcion'].value
    };
    this.callSaveMethod.emit(categoria);
  }

  callUpdate() {
    const categoria: ICategoria = {
      id: this.categoriaForm.controls['id'].value,
      nombre: this.categoriaForm.controls['nombre'].value,
      descripcion: this.categoriaForm.controls['descripcion'].value
    };
    this.callUpdateMethod.emit(categoria);
  }
}