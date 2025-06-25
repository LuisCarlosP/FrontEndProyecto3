import { Component, inject, ViewChild, OnInit, computed } from '@angular/core';
import { UserListComponent } from '../../components/user/user-list/user-list.component';
import { UserFormComponent } from '../../components/user/user-from/user-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IRoleType } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    UserFormComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public userService: UserService = inject(UserService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addUsersModal') public addUsersModal: any;

  isSuperAdmin = computed(() => this.authService.hasRole(IRoleType.superAdmin));

  userForm = this.fb.group({
    id: [null as number | null], 
    email: ['', Validators.required, Validators.email],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
    updatedAt: ['', Validators.required],
  });

  ngOnInit() {
    if (!this.isSuperAdmin()) {
      window.location.href = '/app/access-denied';
      return;
    }
    this.userService.search.page = 1;
    this.userService.getAll();
    console.log('UsersComponent initialized');
  }
}