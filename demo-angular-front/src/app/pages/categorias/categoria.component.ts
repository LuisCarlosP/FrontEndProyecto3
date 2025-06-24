import { Component, inject, ViewChild, OnInit, computed } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { CategoriaService, ICategoria } from '../../services/categoria.service';
import { CategoriaListComponent } from '../../components/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from '../../components/categoria/categoria-form/categoria-form.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CategoriaListComponent,
    CategoriaFormComponent, 
    PaginationComponent,
    ModalComponent,
    LoaderComponent
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  public modalService: ModalService = inject(ModalService);
  public categoriaService: CategoriaService = inject(CategoriaService);
  @ViewChild('addCategoria') public addCategoria: any;
  public fb: FormBuilder = inject(FormBuilder);

  categorias = computed(() => this.categoriaService.categorias$());

  categoriaForm = this.fb.group({
    id: [null as number | null],
    nombre: ['', Validators.required],
    descripcion: ['']
  });

  ngOnInit() {
    this.categoriaService.getAll();
  }

  saveCategoria(categoria: ICategoria) {
    this.categoriaService.save(categoria);
    this.categoriaForm.reset();
    this.modalService.closeAll();
  }

  callEdition(categoria: ICategoria) {
    const { id, nombre, descripcion } = categoria;
    this.categoriaForm.patchValue({ id, nombre, descripcion });
    this.modalService.displayModal('md', this.addCategoria);
  }

  updateCategoria(categoria: ICategoria) {
    this.categoriaService.update(categoria);
    this.categoriaForm.reset();
    this.modalService.closeAll();
  }

  deleteCategoria(categoria: ICategoria) {
    this.categoriaService.delete(categoria);
  }
}