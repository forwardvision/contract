import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ViewContractComponent } from './view-contract/view-contract.component'; // Import the ViewContractComponent

const routes: Routes = [{
  path:'',
  component:UploadComponent
},
{
  path:'view-contract',
  component:ViewContractComponent
 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
