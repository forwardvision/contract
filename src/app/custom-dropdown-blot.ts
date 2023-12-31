// const Quill = require('quill');
import Quill from 'quill';
const BlockEmbed = Quill.import('blots/block/embed');

class CustomDropdown extends BlockEmbed {

  static blotName = 'custom-dropdown';
  static tagName = 'custom-dropdown';

  static create(value: any) {
    const node = super.create(value);

    // Customize your dropdown's HTML structure here
    // For example, create a button that will trigger the dropdown
    node.innerHTML = `<button id="DROP123" class="custom-dropdown-button"style="background:red;">Select Option</button>`;
    return node;
  }
}

CustomDropdown.blotName = 'custom-dropdown';
// CustomDropdown.className = 'ql-custom-dropdown';
 CustomDropdown.tagName = 'DIV';

Quill.register(CustomDropdown, true);
