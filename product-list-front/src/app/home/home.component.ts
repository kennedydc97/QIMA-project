import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductListService } from '../services/product-list.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RestrictedActionDialogComponent } from '../restricted-action-dialog/restricted-action-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  title = 'product-list-front';
  username: string | null = '';

  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'categoryname', 'available', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  filterValue: string = '';
  allProducts: Product[] = [];

  constructor(
    public dialog: MatDialog,
    private productListService: ProductListService,
    private authService: AuthService,
    private router: Router
  ) {
    this.username = this.authService.getUsername();
    this.getAllProducts();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openRestrictedDialog(): void {
    this.dialog.open(RestrictedActionDialogComponent);
  }

  openDialog(action: string, obj?: any) {
    if ((action === 'Delete' || action === 'Edit' || action === 'Add') && this.authService.getUsername() !== 'admin') {
      this.openRestrictedDialog();
      return;
    }

    if (obj) {
      obj.categoryId = obj.category.id;
      obj.categoryDescription = obj.category.description;
    }

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '270px',
      data: { action, ...obj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Add') {
        this.addProduct(result.data);
      } else if (result && result.event === 'Edit') {
        this.editProduct(result.data);
      } else if (result && result.event === 'Delete') {
        this.deleteProduct(result.data);
      }
    });
  }

  addProduct(product: Product) {
    let productRequestBody = this.buildProductRequest(product);
    this.productListService.saveProduct(productRequestBody).subscribe(productSaved => {
      this.dataSource.data.push(productSaved);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  editProduct(product: Product) {
    let productRequestBody = this.buildProductRequest(product);
    this.productListService.update(productRequestBody).subscribe(productUpdated => {
      const index = this.dataSource.data.findIndex(p => p.id === product.id);
      if (index >= 0) {
        this.dataSource.data[index] = productUpdated;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  deleteProduct(product: Product) {
    this.productListService.deleteProduct(product.id).subscribe(response => {
      if (response === null) {
        this.dataSource.data = this.dataSource.data.filter(p => p.id !== product.id);
      } else {
        console.log("Error trying to delete the product");
      }
    });
  }

  getAllProducts() {
    this.productListService.getAllProducts().subscribe(products => {
      this.allProducts = products;
      this.dataSource.data = products;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  buildProductRequest(product: Product) {
    let productBody: any = product;
    productBody.category = {
      id: product.categoryId,
      description: product.categoryDescription
    };
    return productBody;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
