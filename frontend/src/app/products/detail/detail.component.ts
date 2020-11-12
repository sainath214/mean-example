import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service'
import { ApiResponse } from 'src/app/Model/api-response';
import { Product } from 'src/app/Model/product';
import { Router, Params, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private apiservice: ServicesService, private router: Router, private routes: ActivatedRoute) { }
  product: any;
  ngOnInit(): void {
    const routeParams = this.routes.snapshot.params;

    this.apiservice.getProductDetails(routeParams.id).subscribe((data: any) => {
      this.product = data.data;
      //console.log(data);
    })
  }

}
