import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { DataItem } from './data-item';
import { ProductService } from './product.service';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //  @ViewChild('productRef', {static: false}) product!: ProductComponent;
  searchvalues: any;
  pSize: number = 1;

  statusFilterFn = (list: string[], item: DataItem): boolean =>
    list.some((statusname) => item.status.indexOf(statusname) !== -1);

  filterStatus = [
    { text: 'Released', value: 'Released' },
    { text: 'Review', value: 'Review' },
    { text: 'Pending', value: 'Pending' },
    { text: 'Work in Progress', value: 'Work in Progress' },
    { text: 'Coming soon', value: 'Coming soon' },
  ];

  listOfColumn = [
    {
      title: '#',
      compare: (a: DataItem, b: DataItem) => a.id - b.id,
      priority: 1,
      showsorter: true,
      filterfn: false,
      filters: [],
      showFilter: false,
    },
    {
      title: 'Project Name',
      compare: (a: DataItem, b: DataItem) =>
        a.projectname.localeCompare(b.projectname),
      priority: 2,
      showsorter: true,
      filterfn: null,
      filters: [],
      showFilter: false,
    },
    {
      title: 'Start Date',
      compare: (a: DataItem, b: DataItem) =>
        new Date(a.startdate).getTime() - new Date(b.startdate).getTime(),
      priority: 3,
      showsorter: true,
      filterfn: null,
      filters: [],
      showFilter: false,
    },
    {
      title: 'Due Date',
      compare: (a: DataItem, b: DataItem) =>
        new Date(a.duedate).getTime() - new Date(b.duedate).getTime(),
      priority: 4,
      showsorter: true,
      filterfn: null,
      filters: [],
      showFilter: false,
    },
    {
      title: 'Status',
      compare: false,
      priority: false,
      showsorter: false,
      filterfn: this.statusFilterFn,
      filters: this.filterStatus,
      showFilter: true,
    },
    {
      title: 'Assign',
      compare: (a: DataItem, b: DataItem) => a.assign.localeCompare(b.assign),
      priority: 5,
      showsorter: true,
      filterfn: null,
      filters: [],
      showFilter: false,
    },
    {
      title: 'Action',
      compare: false,
      priority: false,
      showsorter: false,
      filterfn: null,
      filters: [],
      showFilter: false,
    },
  ];

  datasource: DataItem[] = [];
  displayData: DataItem[] = [];

  constructor(
    private modal: NzModalService,
    private productservice: ProductService
  ) {}

  ngOnInit(): void {
    this.productservice.currentMessage.subscribe((data) => {
      if (data === 'submit') {
        let newItem = this.productservice.getProductItem();
        if (newItem) {
          this.datasource.push(newItem);
          this.updateOrder();
          this.displayData = [...this.datasource];
          this.updateProductCount();
        }
      }
    });
    this.datasource = this.productservice.getAllProducts();
    this.updateOrder();
    this.updateProductCount();
    this.displayData = this.datasource;
  }

  pageSize(event: any) {
    if (event > 1) {
      this.pSize = (event - 1) * 10 + 1;
    } else {
      this.pSize = 1;
    }
    console.log(event);
  }

  editRow(data: DataItem) {
    this.productservice.setEditvalue(data);
    this.productservice.sendMessage('edit');
  }
  private updateProductCount() {
    this.productservice.setLength(this.datasource.length + 1);
  }

  deleteRow(id: number, name: string) {
    this.showDeleteConfirm(id, name);
  }

  applyFilter() {
    this.displayData = this.datasource.filter((item: DataItem) => {
      return (
        item.projectname.trim().toLowerCase().includes(this.searchvalues) ||
        item.assign.trim().toLowerCase().includes(this.searchvalues)
      );
    });
    if (this.searchvalues === '') {
      this.displayData = this.datasource;
    }
    this.displayData = [...this.displayData];
    console.log(this.searchvalues);
  }

  onSearchClear() {
    this.searchvalues = '';
    this.applyFilter();
  }

  private updateOrder() {
    this.datasource.map((item, index) => {
      item.order = index+1;
    });
  }

  showDeleteConfirm(arg: number, name: string): void {
    this.modal.confirm({
      nzTitle: name,
      nzContent: 'Are you sure delete this project?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.datasource = this.datasource.filter((obj) => obj.id !== arg);
        this.updateOrder();
        this.displayData = [...this.datasource];
        this.updateProductCount();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
