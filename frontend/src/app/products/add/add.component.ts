import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private apiservice: ServicesService,
    private router: Router) { }

  addProduct: FormGroup;
  userId: any;

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userid')
    if (!this.userId) {
      this.router.navigate(['login']);
    }
    this.addProduct = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  onSubmit() {

    this.apiservice.createProduct(this.addProduct.value).subscribe(data => {
      this.router.navigate(['products']);
    })
  }


}
