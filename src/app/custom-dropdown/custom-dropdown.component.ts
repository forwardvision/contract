// custom-dropdown.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  template: `
    <div class="custom-dropdown-menu">
      <button (click)="handleOptionClick('Option 1')">Option 1</button>
      <button (click)="handleOptionClick('Option 2')">Option 2</button>
      <button (click)="handleOptionClick('Option 3')">Option 3</button>
    </div>
  `,
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent {
  handleOptionClick(option: string) {
    alert(`Selected option: ${option}`);
    // Handle the selected option as needed
  }
}
