import {
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Component,
  ElementRef,
  ComponentRef,
  NgModule,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //browser platform
import { SharedService } from '../shared.service';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import '../custom-dropdown-blot'; // Import the custom blot
import { CustomDropdownComponent } from '../custom-dropdown/custom-dropdown.component'; // Import the custom dropdown component
import { QuillModule } from 'ngx-quill';
import {
  createCustomButton,
  createCustomDropdownButton,
  removestandard,
  
} from './custom-buttons';
@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css'],
})
export class ViewContractComponent {
  resultValue: any;
  extractedContent: any;
  sectionsHtml: any;
  initialized: boolean = false;
  sections: string[];
  private editorCount = 0

  @ViewChild('editorContainerstatic', { read: ViewContainerRef })
  editorContainerstatic!: ViewContainerRef;

  @ViewChild('editorContainerdynamic', { read: ViewContainerRef })
  editorContainerdynamic!: ViewContainerRef;

  editorStyle = {
    minWidth: '745px',
    // height: '200px',
    //backgroundColor: '#808080',
    // overflow: scroll
  };

  constructor(
    private sharedService: SharedService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.resultValue = this.sharedService.getResultValue();
    this.extractedContent = this.sharedService.getextractedContent();
    this.sectionsHtml = this.sharedService.getsectionsHtml();
    this.sections = [];
    // console.log('secreen 2', this.sectionsHtml);
  }

  ngAfterViewInit() {
    this.sections = this.sectionsHtml.split('<section>');
    this.sections.shift(); // Remove 1st empty element created by split
    this.sections.forEach((section: string) => {
      this.createDynamicQuillEditor(section); //Create Quill 4 each section
    });
    this.createStaticQuillEditor(this.resultValue); //Quill 4 static section
  }

  //################################ Dynamic
  createDynamicQuillEditor(content: string) {
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(
        QuillEditorComponent
      );  

    const editorComponent = factory.create(
      this.editorContainerdynamic.parentInjector
    );

    editorComponent.instance.content = content;
    editorComponent.instance.styles = this.editorStyle;

    // Subscribe to the onEditorCreated event to access the Quill instance
    editorComponent.instance.onEditorCreated.subscribe((quill) => {

      removestandard(quill);
      
      createCustomDropdownButton(quill, 'label', 'ql-custom-dropdown', function () {
          alert('Clicked Dropdown');
          // Handle your "Dropdown" logic here
        }
      );
      
      createCustomButton(quill, 'Merge Up', 'ql-mergeUp', function () {
       
        alert('Clicked Merge Up');
        // Handle your "Merge Up" logic here
      });

    });

    this.editorContainerdynamic.insert(editorComponent.hostView);
  }

  //######################################### Static
  createStaticQuillEditor(content: string) {
    const factorystatic =
      this.componentFactoryResolver.resolveComponentFactory(
        QuillEditorComponent
      );

    const editorComponentstatic = factorystatic.create(
      this.editorContainerstatic.parentInjector
    );
    editorComponentstatic.instance.content = content; // Pass content to the editor
    editorComponentstatic.instance.styles = this.editorStyle;

    // Subscribe to the onEditorCreated event to access the Quill instance
    editorComponentstatic.instance.onEditorCreated.subscribe((quill) => {

      removestandard(quill);
            
      createCustomButton(quill, 'Summary', 'ql-summary', function () {
        alert('Clicked Summary');
        // Handle your "Merge Up" logic here
      });

    });



    this.editorContainerstatic.insert(editorComponentstatic.hostView);
  }
}





















    // // Subscribe to the onEditorCreated event to access the Quill instance
    // editorComponent.instance.onEditorCreated.subscribe((quill) => {

    //   const customButton = document.createElement('ql-mergeUp');
    //   customButton.textContent = 'Merge Up';
    //   customButton.classList.add('ql-custom-button');
    //   customButton.style.cursor = 'pointer';
    //   customButton.style.float = 'left';

    //   var defaultlabel = ['saab'];
    //   const customButton1 = document.createElement('ql-custom-dropdown');
    //   customButton1.classList.add('ql-custom-dropdown');
    //   customButton1.style.float = 'left';
    //   customButton1.style.border = 'left'
    //   customButton1.innerHTML = "<div class=\"custom-dropdown-menu\"> \
    //   <select name=\"cars\" id=\"cars\"> \
    //   <option value=\"volvo\">Volvo</option> \
    //   <option value=\"saab\">Saab</option> \
    //   </select> \
    //   </div>";

    //   // Add a click event listener for the custom button
    //   customButton.addEventListener('click', function () {
    //     alert('Clicked');
    //     // Handle your "Merge Up" logic here
    //   });

    //   customButton1.addEventListener('change', function () {
    //     alert('Clicked');
    //     // Handle your "Merge Up" logic here
    //   })

    //   // Add the custom button to the existing toolbar
    //   const toolbarContainer = quill.getModule('toolbar').container;
    //   while (toolbarContainer.firstChild) {
    //     toolbarContainer.removeChild(toolbarContainer.firstChild);
    //   }
    //   toolbarContainer.appendChild(customButton);
    //   toolbarContainer.appendChild(customButton1);
    // });



//trial code

//trial  code

// const customButton = document.createElement('ql-mergeUp');
// customButton.textContent = 'Merge Up';
// customButton.classList.add('ql-custom-button');
// customButton.style.cursor = 'pointer';
// customButton.style.float = 'left';

// var defaultlabel = ['saab'];
// const customButton1 = document.createElement('ql-custom-dropdown');
// customButton1.classList.add('ql-custom-dropdown');
// customButton1.style.float = 'left';
// customButton1.style.border = 'left'
// customButton1.innerHTML = "<div class=\"custom-dropdown-menu\"> \
// <select name=\"cars\" id=\"cars\"> \
// <option value=\"volvo\">Volvo</option> \
// <option value=\"saab\">Saab</option> \
// </select> \
// </div>";

// // Add a click event listener for the custom button
// customButton.addEventListener('click', function () {
//   alert('Clicked');
//   // Handle your "Merge Up" logic here
// });

// customButton1.addEventListener('change', function () {
//   alert('Clicked');
//   // Handle your "Merge Up" logic here
// })

// // Add the custom button to the existing toolbar
// const toolbarContainer = quill.getModule('toolbar').container;
// while (toolbarContainer.firstChild) {
//   toolbarContainer.removeChild(toolbarContainer.firstChild);
// }
// toolbarContainer.appendChild(customButton);
// toolbarContainer.appendChild(customButton1);
