import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProducto } from '../../../interfaces';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss'
})
export class ProductosListComponent {
  @Input() productos: IProducto[] = [];
  @Input() isSuperAdmin: boolean = false;
  @Output() callModalAction = new EventEmitter<IProducto>();
  @Output() callDeleteAction = new EventEmitter<IProducto>();
}