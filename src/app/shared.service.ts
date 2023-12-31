// shared.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  resultValue: any;
  extractedContent: any;
  sectionsHtml: any;

  setResultValue(value: any) {
    this.resultValue = value;
  }

  getResultValue() {
    return this.resultValue;
  }

  setextractedContent(value: any) {
    this.extractedContent = value;
  }

  getextractedContent() {
    return this.extractedContent;
  }

  setsectionsHtml(value: any) {
    this.extractedContent = value;
  }

  getsectionsHtml() {
    return this.extractedContent;
  }
}
