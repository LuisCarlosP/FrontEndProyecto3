import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategoria } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent {
  @Input() categorias: ICategoria[] = [];
  @Output() callModalAction = new EventEmitter<ICategoria>();
  @Output() callDeleteAction = new EventEmitter<ICategoria>();
}