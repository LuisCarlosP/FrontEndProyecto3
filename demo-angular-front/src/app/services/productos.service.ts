import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProducto, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService<IProducto> {
  protected override source: string = 'productos';
  private productoListSignal = signal<IProducto[]>([]);
  get productos$() {
    return this.productoListSignal;
  }
  public search: ISearch = { 
    page: 1,
    size: 10
  }
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.productoListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(producto: IProducto) {
    this.add(producto).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Ocurrió un error al agregar el producto', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

    update(producto: IProducto) {
        this.edit(producto.id, producto).subscribe({
            next: (response: any) => {
            this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
            this.getAll();
            },
            error: (err: any) => {
            this.alertService.displayAlert('error', 'Ocurrió un error al actualizar el producto', 'center', 'top', ['error-snackbar']);
            console.error('error', err);
            }
        });
    }
  delete(producto: IProducto) {
    this.del(`${producto.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Ocurrió un error al eliminar el producto', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}