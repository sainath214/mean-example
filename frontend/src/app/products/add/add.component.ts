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
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userid')
    if (!this.userId) {
      this.router.navigate(['login']);
    }
    this.addProduct = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
     
    })
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }


  onSubmit() {
    console.log(this.fileData);
    let formData = new FormData();
    
    formData.append("name", this.addProduct.value.name);
    formData.append("description", this.addProduct.value.description );
    formData.append("price", this.addProduct.value.price );
    formData.append("image", this.fileData );

    console.log(formData);
    this.apiservice.createProduct(formData).subscribe(data => {
      this.router.navigate(['products']);
    })
  }


}
