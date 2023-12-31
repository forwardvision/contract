import { Component } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as demoFunctions from '../../assets/demo.js';
import { SharedService } from '../shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { JSDOM } from 'jsdom';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  //defaultFileName: string = 'C:\\Users\\intern\\Desktop\\without pic.docx';

  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}
  //extractedContent: any | undefined;

  processFile(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      //------amit code for xml extration ----------//
      // const formData = new FormData();
      // formData.append('file', file);
      // const xhr = new XMLHttpRequest();
      // try {
      //   xhr.open('POST', 'http://127.0.0.1:5000/extract-docx', false); // Set the third parameter to false to make it synchronous
      //   xhr.send(formData);
      // } catch (error) {
      //   console.error('Error making synchronous request:', error);
      // }
      // if (xhr.status === 200) {
      //   const response = JSON.parse(xhr.responseText);
      //   const extractedContent = response.content;
      //   this.sharedService.setextractedContent(extractedContent);
      //   // console.log('screen1', response.content);
      // } else {
      //   console.error('Error extracting DOCX file:', xhr.statusText);
      // }
      //----------------//

      reader.onload = (e) => {
        if (e.target) {
          const fileContent = e.target.result as ArrayBuffer;
          demoFunctions
            .convertToHtml({ arrayBuffer: fileContent })
            .then((resultValue: any) => {
              var extractedContent: any;
              var sectionsHtml: any;
              sectionsHtml = this.addParagraphBeforeTables(resultValue);
              // extractedContent = this.addParagraphBeforeTables(resultValue);
              this.sharedService.setextractedContent(extractedContent);
              this.sharedService.setsectionsHtml(sectionsHtml);
              // console.log('-------------Result value');
              // console.log('Result value:', resultValue);
              this.sharedService.setResultValue(resultValue);
              this.router.navigate(['/view-contract']);
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  addParagraphBeforeTables(htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Insert a paragraph element before <table> elements
    const tables = doc.querySelectorAll('table');

    tables.forEach((table) => {
      const parent = table.parentElement;
      const previousSibling = parent?.previousElementSibling;

      // Check if the previous sibling is not a <p> element and is not indented
      if (
        previousSibling &&
        previousSibling.tagName !== 'P' &&
        !previousSibling.innerHTML.trim()
      ) {
        const paragraph = doc.createElement('SECTION');
        paragraph.textContent = '======Table=====';
        // paragraph.style.display = 'none';
        // paragraph.style.fontSize = 'large';
        parent.insertBefore(paragraph, table);
      }
    });

    const lists = doc.querySelectorAll('ol, ul');
    // const noOfolul = lists.length
    lists.forEach((list) => {
      const parent = list.parentElement;
      const previousSibling = parent?.previousElementSibling;
      const noOfolul = list.querySelectorAll('li').length;
      if (
        previousSibling &&
        previousSibling.tagName !== 'P' &&
        !previousSibling.innerHTML.trim() &&
        noOfolul > 3
      ) {
        //if (previousSibling && previousSibling.tagName !== 'P' && !previousSibling.innerHTML.trim()) {
        const paragraph = doc.createElement('SECTION');
        paragraph.textContent = `~~~~~ol ul~~~~~ (${noOfolul} items)`;
        parent.insertBefore(paragraph, list);
      }
    });

    const listItems = doc.querySelectorAll('li');

    const noOfli = listItems.length;

    listItems.forEach((li) => {
      const parent = li.parentElement;
      const previousSibling = parent?.previousElementSibling;

      //if (previousSibling && previousSibling.tagName !== 'OL' && !previousSibling.innerHTML.trim()) {
      if (
        previousSibling &&
        !['LI', 'OL', 'UL', 'A'].includes(previousSibling.tagName) &&
        !previousSibling.innerHTML.trim()
      ) {
        const paragraph = doc.createElement('SECTION');
        paragraph.textContent = `------List----- (${noOfli} items)`;
        parent.insertBefore(paragraph, li);
      }
    });

    // Add a new section at beginning of the document
    const firstElement = doc.body.querySelector(':first-child');
    if (firstElement && firstElement.tagName !== 'SECTION') {
      const paragraph = doc.createElement('SECTION');
      paragraph.textContent = `------Introduction-----`;
      doc.body.insertBefore(paragraph, doc.body.firstChild);

      // const paragraph = doc.createElement('SECTION');
      // const h1 = doc.createElement('h1');
      // h1.textContent = '------Introduction-----';
      // paragraph.appendChild(h1);

      doc.body.insertBefore(paragraph, doc.body.firstChild);
    }

    // return new XMLSerializer().serializeToString(doc);
    var sectionsHtml: any;
    // sectionsHtml = this.label_sections(doc.documentElement.innerHTML);
    //sectionsHtml = this.label_sections_gpt(doc.documentElement.innerHTML);
    return doc.documentElement.innerHTML;
  }

  label_sections(htmlString: string): string {
    var asd = '';
    const sections = htmlString.split('<section>');
    sections.shift(); // Remove 1st empty element created by split
    sections.forEach((section: string) => {
      console.log('-------section-------');
      console.log(section);
      //------amit code for python ----------//
      const xhr = new XMLHttpRequest();
      try {
        xhr.open('POST', 'http://127.0.0.1:5000/label_section', false); // Set the third parameter to false to make it synchronous
        xhr.send(section);
      } catch (error) {
        console.error('Error making synchronous request:', error);
      }
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // const extractedContent = response.content;
        //   this.sharedService.setextractedContent(extractedContent);
        console.log('screen1', response);
      } else {
        console.error('Error', xhr.statusText);
      }
      //----------------//
    });

    return asd;
  }

  label_sections_gpt(htmlString: string): string {
    var asd = '';

    // const sections = htmlString.split('<section>');
    // sections.shift(); // Remove 1st empty element created by split

    ////---------GPT
    const url = 'https://api.openai.com/v1/chat/completions';
    const httpheader = new HttpHeaders().set(
      'Authorization',
      'Bearer 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'
    );
    // const whoareyou = 'I am negotiating a contract with a customer. you are corporate lawyer helping me understand the rights, obligations, liabilitiies and risks in the contract'
    const whoareyou =
      'I am negotiating a contract with a customer. you are corporate lawyer helping me understand the contract';
    // const prompt = 'please point out the obligations in following text in a simple tabular format showing clause number, clause text , obligation and person responsible as the columns'
    //const prompt = 'please print the following text as is except for one change as follows.please suggest a title or heading for each part of the text where <SECTION> tag is present. Concatenate the title or heading as text in the <SECTION> - ' + htmlString
    const prompt =
      'analyze the following and please print the document date, effective date and the parties signing the contract - ' +
      htmlString;
    ////---------GPT

    let messages = []; // Start with an empty array
    var temperature = 1;

    // sections.forEach((section: string) => {
    let contentForUser = prompt;
    let contentForSystem = whoareyou;

    messages = [
      { role: 'system', content: contentForSystem },
      { role: 'user', content: contentForUser },
    ];

    let payload = {
      model: 'gpt-3.5-turbo',
      messages: messages, // Use the updated messages array
      temperature: temperature,
    };

    this.http.post(url, payload, { headers: httpheader }).subscribe(
      (data: any) => {
        data = data.choices[0].message.content;
        console.log('-------section-------');
        console.log('gpt', data);
        // console.log(section);
      },
      (error: any) => {
        console.log(error);
      }
    );

    // });

    return asd;
  }
}
