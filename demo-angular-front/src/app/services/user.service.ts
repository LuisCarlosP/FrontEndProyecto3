import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ISearch, IUser } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {
  protected override source: string = 'users';
  private userListSignal = signal<IUser[]>([]);
  get users$() {
    return this.userListSignal;
  }
  public search: ISearch = { 
    page: 1,
    size: 10
  }
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.userListSignal.set(response.data ?? []);
        if (response.meta) {
          this.search = { ...this.search, ...response.meta };
          this.totalItems = Array.from(
            { length: this.search.totalPages ? this.search.totalPages : 0 },
            (_, i) => i + 1
          );
        }
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }
}
