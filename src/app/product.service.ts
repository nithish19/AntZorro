import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataItem } from './data-item';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private message = new BehaviorSubject('');
  currentMessage = this.message.asObservable();
  currentDataItem?: DataItem;
  editDataItem?: DataItem;
  productCount!: number;
  constructor() {}

  getAllProducts() {
    let listOfData: DataItem[] = [
      {
        id: 1,
        projectname: 'Angular',
        startdate: new Date(),
        duedate: new Date(),
        status: 'Pending',
        assign: 'Nithish',
      },
      {
        id: 2,
        projectname: 'React',
        startdate: new Date(),
        duedate: new Date(),
        status: 'Review',
        assign: 'Kumar',
      },
      {
        id: 3,
        projectname: 'TypeScript',
        startdate: new Date(),
        duedate: new Date(),
        status: 'Coming soon',
        assign: 'Kanal',
      },
      {
        id: 4,
        projectname: 'JavaScript',
        startdate: new Date(),
        duedate: new Date(),
        status: 'Released',
        assign: 'Kannan',
      },
      
    ];
    //TODO: Testing
    // for(let i=0;i<=4;i++){
    //   listOfData.forEach((value)=>{
    //      listOfData.push(value);
    //   })
    // }
    return listOfData;
  }

  sendMessage(value: string) {
    this.message.next(value);
  }

  setProductItem(item: DataItem) {
    this.currentDataItem = item;
  }

  getProductItem() {
    return this.currentDataItem;
  }

  setEditvalue(value: DataItem) {
    this.editDataItem = value;
  }

  getEditvalue() {
    return this.editDataItem;
  }

  setLength(count: number) {
    this.productCount = count;
  }

  getLenth() {
    return this.productCount;
  }
}
