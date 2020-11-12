import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service'
import { ApiResponse } from 'src/app/Model/api-response';
import { Product } from 'src/app/Model/product';
import { Router } from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private apiservice: ServicesService, private router: Router) { }
  products: any;
  userId: any;
  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userid')
    if (!this.userId) {
      this.router.navigate(['login']);
    }
    this.apiservice.getProducts().subscribe((data: any) => {
      this.products = data.data;
      console.log(this.products);
    })
  }

  deleteProduct(e, product: Product): void {
    e.stopPropagation();
    this.apiservice.deleteProduct(product.productId).subscribe(data => {
      this.products = this.products.filter(p => { p !== product })
    })
  }

  logout() {
    window.localStorage.removeItem('userid');
    this.router.navigate(['login']);
  }

}
