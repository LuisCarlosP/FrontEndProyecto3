import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent {
  @Input() categorias: ICategoria[] = [];
  @Output() callModalAction = new EventEmitter<ICategoria>();
  @Output() callDeleteAction = new EventEmitter<ICategoria>();
}