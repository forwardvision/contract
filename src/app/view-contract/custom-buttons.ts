import Quill from 'quill';


//###########################
export function removestandard( quill: Quill,) {
    while (quill.getModule('toolbar').container.firstChild) {
        quill
          .getModule('toolbar')
          .container.removeChild(quill.getModule('toolbar').container.firstChild);
      }
   }

export function createCustomButton(
  // quill, 'Merge Up', 'ql-mergeUp', function
  quill: Quill,
  text: string,
  className: string,
  clickHandler: () => void
) {
  const customButton = document.createElement('button');
  customButton.textContent = text;
  customButton.classList.add(className);
  customButton.style.cursor = 'pointer';
  customButton.style.float = 'left';

  customButton.addEventListener('click', clickHandler);

  const toolbarContainer = quill.getModule('toolbar').container;
  toolbarContainer.appendChild(customButton);
}

//###########################
export function createCustomDropdownButton(
  quill: Quill,
  text: string,
  className: string,
  changeHandler: () => void
) {

  const CustomDropdown = document.createElement(className); //'ql-custom-dropdown'
  CustomDropdown.classList.add(className); //'ql-custom-dropdown'
  CustomDropdown.style.float = 'right';



// Create the select element
const selectElement = document.createElement('select');
selectElement.name = 'labels';
selectElement.id = 'labels';

// Assume your data is stored in an array called 'carData'
const labelData = [
  { value: 'Intro', label: 'Intro' },
  { value: 'Singanture', label: 'Signature' },
  // Add more data as needed
];

// Populate the select element with options based on your data
labelData.forEach((label) => {
  const option = document.createElement('option');
  option.value = label.value;
  option.textContent = label.label;
  selectElement.appendChild(option);
});

// Create the dropdown container and append the select element
const dropdownMenu = document.createElement('div');
dropdownMenu.classList.add('custom-dropdown-menu');
dropdownMenu.appendChild(selectElement);

CustomDropdown.appendChild(dropdownMenu);

  // CustomDropdown.innerHTML =
  //   '<div class="custom-dropdown-menu"> \
  //   <select name="cars" id="cars"> \
  //   <option value="volvo">Volvo</option> \
  //   <option value="saab">Saab</option> \
  //   </select> \
  //   </div>';

  const toolbarContainer = quill.getModule('toolbar').container;
  toolbarContainer.appendChild(CustomDropdown);
  CustomDropdown.addEventListener('change', function () {
    alert('Clicked');
  });
}