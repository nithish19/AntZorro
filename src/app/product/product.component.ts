import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NzNotificationPlacement,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { count } from 'rxjs';
import { DataItem } from '../data-item';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  projectForm!: FormGroup;
  editProjectItem!: DataItem;
  productId:number=0;
  editoption: boolean = false;
  showWeekNumber: boolean = false;
//   statusarray:any[]=[{
//    name:"Released",id:1},
//   {name:"Review",id:2}
// ];

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private productservice: ProductService
  ) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectname: ['', [Validators.required]],
      startdate: ['', [Validators.required]],
      duedate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      assign: ['', [Validators.required]],
    });

    this.productservice.currentMessage.subscribe((editdata) => {
      if (editdata === 'edit') {
        const editvalue = this.productservice.getEditvalue();
        if (editvalue) {
          this.editoption = true;
          this.projectname?.setValue(editvalue.projectname);
          this.startdate?.setValue(editvalue.startdate);
          this.duedate?.setValue(editvalue.duedate);
          this.status?.setValue(editvalue.status);
          this.assign?.setValue(editvalue.assign);
          this.editProjectItem = editvalue;
        }
      }
    });
  }

  get projectname() {
    return this.projectForm.get('projectname');
  }
  get startdate() {
    return this.projectForm.get('startdate');
  }
  get duedate() {
    return this.projectForm.get('duedate');
  }
  get status() {
    return this.projectForm.get('status');
  }
  get assign() {
    return this.projectForm.get('assign');
  }

  successMessage(position: NzNotificationPlacement) {
    this.notification.blank('Successfully Added', '', {
      nzPlacement: position,
      nzDuration: 3000,
    });
  }

  updateMessage(position: NzNotificationPlacement) {
    this.notification.blank('Successfully Updated', '', {
      nzPlacement: position,
      nzDuration: 3000,
    });
  }

  submitForm(): void {
    if (this.projectForm.valid) {
      if (this.editoption) {
        this.editProjectItem!.projectname = this.projectname?.value;
        this.editProjectItem!.startdate = this.startdate?.value;
        this.editProjectItem!.duedate = this.duedate?.value;
        this.editProjectItem!.status = this.status?.value;
        this.editProjectItem!.assign = this.assign?.value;
        this.editoption = false;
        this.updateMessage('bottomLeft');
      } else {
        this.productId=this.productId+1;
        let item: DataItem = {
          id: this.productId,
          projectname: this.projectname?.value,
          startdate: this.startdate?.value,
          duedate: this.duedate?.value,
          status: this.status?.value,
          assign: this.assign?.value,
        };
        this.productservice.setProductItem(item);
        this.successMessage('bottomLeft');
        this.productservice.sendMessage('submit');
      }
      this.projectForm.reset();
    } else {
      Object.values(this.projectForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
