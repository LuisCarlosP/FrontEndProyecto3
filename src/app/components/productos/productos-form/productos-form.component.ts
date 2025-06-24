import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProducto } from '../../../interfaces';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.scss'
})
export class ProductosFormComponent {
  public fb: FormBuilder = inject(FormBuilder);

  @Input() productoForm!: FormGroup;
  @Input() categorias: any[] = []; // <-- Agrega este input

  @Output() callSaveMethod = new EventEmitter<IProducto>();
  @Output() callUpdateMethod = new EventEmitter<IProducto>();

  callSave() {
    const producto: IProducto = {
      nombre: this.productoForm.controls['nombre'].value,
      descripcion: this.productoForm.controls['descripcion'].value,
      precio: this.productoForm.controls['precio'].value,
      cantidadStock: this.productoForm.controls['cantidadStock'].value,
      categoria: this.productoForm.controls['categoria'].value
    };
    this.callSaveMethod.emit(producto);
  }

  callUpdate() {
    const producto: IProducto = {
      id: this.productoForm.controls['id'].value,
      nombre: this.productoForm.controls['nombre'].value,
      descripcion: this.productoForm.controls['descripcion'].value,
      precio: this.productoForm.controls['precio'].value,
      cantidadStock: this.productoForm.controls['cantidadStock'].value,
      categoria: this.productoForm.controls['categoria'].value
    };
    this.callUpdateMethod.emit(producto);
  }
}