import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  constructor( 
    public router: Router
    ) { 
   
  }

  printDocument(documentName: string, documentData: any[]) {
    this.isPrinting = true;
    return this.router.navigate(['print/'+documentName,documentData.join()]).then(
        () => true
      );
  }

  onDataReady(name) {
    setTimeout(() => {
      this.isPrinting = false;
      const options = {
        filename: name,
        // image: {type: 'jpeg'},
        html2canvas:{},
        jsPDf: {orientation: 'landscape'}
      }

      const content: Element = document.getElementById('pdf');

      html2pdf()
      .from(content)
      .set(options)
      .save();
      this.router.navigate([{ outlets: { print: null }}]);
    },5000);
  }
}
