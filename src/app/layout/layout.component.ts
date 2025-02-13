import { Component } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { ProductService } from './product.service';

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

type LayoutType = 'list' | 'grid';
type SeverityType = 'success' | 'info' | 'warn' | 'danger' | undefined;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    DataView,
    Tag,
    Rating,
    ButtonModule,
    CommonModule,
    SelectButton,
    FormsModule
  ],
  providers: [ProductService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  /*
  Definimos tipos específicos para layout y severity
Modificamos el retorno de getSeverity para que coincida con los tipos permitidos por PrimeNG
Agregamos el ProductService a los providers del componente
Tipamos correctamente el signal de products como Product[]
Definimos las opciones del layout con el tipo correcto
  */


  layout: LayoutType = 'grid';

  products = signal<Product[]>([]);

  options: LayoutType[] = ['list', 'grid'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().then((data) => {
      this.products.set([...data.slice(0,12)]);
    });
  }

  getSeverity(product: Product): SeverityType {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }
}
