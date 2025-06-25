import { Component, inject, ViewChild, OnInit, computed } from '@angular/core';
import { ProductosListComponent } from '../../components/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from '../../components/productos/productos-form/productos-form.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProducto } from '../../interfaces';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService} from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';
import { IRoleType } from '../../interfaces';



@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    ProductosListComponent,
    ProductosFormComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  public modalService: ModalService = inject(ModalService);
  public productosService: ProductosService = inject(ProductosService);
  public categoriaService: CategoriaService = inject(CategoriaService);
  public fb: FormBuilder = inject(FormBuilder);
  public authService: AuthService = inject(AuthService);

  @ViewChild('addProductos') public addProductos: any;

  isSuperAdmin = computed(() => this.authService.hasRole(IRoleType.superAdmin));
  productos = computed(() => this.productosService.productos$());
  categorias = computed(() => this.categoriaService.categorias$());

  productoForm = this.fb.group({
  id: [null as number | null], 
  nombre: ['', Validators.required],
  descripcion: [''],
  precio: [null as number | null, [Validators.required, Validators.min(1)]],
  cantidadStock: [0, [Validators.required, Validators.min(0)]],
  categoria: [null as any]
});

  ngOnInit() {
    this.productosService.getAll();
    this.categoriaService.getAll();
  }

  saveProducto(producto: IProducto) {
    this.productosService.save(producto);
    this.productoForm.reset();
    this.modalService.closeAll();
  }

  callEdition(producto: IProducto) {
    const { id, nombre, descripcion, precio, cantidadStock, categoria } = producto;
    this.productoForm.patchValue({ id, nombre, descripcion, precio, cantidadStock, categoria });
    this.modalService.displayModal('md', this.addProductos);
  }   

  updateProducto(producto: IProducto) {
    this.productosService.update(producto);
    this.productoForm.reset();
    this.modalService.closeAll();
  }

  deleteProducto(producto: IProducto) {
    this.productosService.delete(producto);
  }
}