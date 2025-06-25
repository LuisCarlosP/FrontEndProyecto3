import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

import { ICategoria } from '../interfaces'; // o el path correcto

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {
  protected override source: string = 'categorias';
  private categoriaListSignal = signal<ICategoria[]>([]);
  get categorias$() {
    return this.categoriaListSignal;
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
        this.categoriaListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(categoria: ICategoria) {
    this.add(categoria).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Ocurrió un error al agregar la categoría', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(categoria: ICategoria) {
    this.edit(categoria.id, categoria).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Ocurrió un error al actualizar la categoría', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(categoria: ICategoria) {
    this.del(categoria.id).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Ocurrió un error al eliminar la categoría', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}