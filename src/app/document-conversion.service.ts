// import { Injectable } from '@angular/core';
// import * as mammoth from 'mammoth';

// @Injectable({
//   providedIn: 'root',
// })
// export class DocumentConversionService {
//   constructor() {}

//   convertToHtml(docxFile: File): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const arrayBuffer = event.target?.result as ArrayBuffer;
//         const data = new Uint8Array(arrayBuffer);
//         const options = {};
//         mammoth.convertToHtml({ arrayBuffer: data }, options)
//           .then((result) => {
//             resolve(result.value);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsArrayBuffer(docxFile);
//     });
//   }
// }
