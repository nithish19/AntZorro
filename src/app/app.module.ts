import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductComponent } from './product/product.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TestApplicationComponent } from './test-application/test-application.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [			
    AppComponent,
    ProductComponent,
    DashBoardComponent,
    TestApplicationComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzTableModule,
    NzAlertModule,
    NzResultModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzNotificationModule,
    NzTabsModule,
    NzAvatarModule,
    NzProgressModule,
    NzGridModule,
    NzListModule,
    NzTypographyModule,
    NzRadioModule,
    NzDrawerModule,
    NzDividerModule,
    NzSpaceModule



  ],
  exports:[
    NzCardModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzTableModule,
    NzAlertModule,
    NzResultModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzNotificationModule,
    NzTabsModule,
    NzAvatarModule,
    NzProgressModule,
    NzGridModule,
    NzListModule,
    NzTypographyModule,
    NzRadioModule,
    NzDrawerModule,
    NzDividerModule,
    NzSpaceModule
    

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [TestApplicationComponent]
})
export class AppModule { }
