import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { ViewContractComponent } from './view-contract/view-contract.component';
import { SplitterModule } from 'primeng/splitter';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewContractComponent,
    CustomDropdownComponent
      ],
  imports: [
    BrowserModule,HttpClientModule, FormsModule, 
    AppRoutingModule,SplitterModule,QuillModule,
    QuillModule.forRoot({
      suppressGlobalRegisterWarning: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
