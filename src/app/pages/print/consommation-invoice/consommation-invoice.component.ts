import { Component, OnInit, ViewChild } from '@angular/core';
import { Consommation } from 'src/app/models/consommation.model';
import { Client } from 'src/app/models/client.model';
import { PrintService } from 'src/app/services/print.service';
import { ConsommationService } from 'src/app/services/consommation.service';
import { LocationService } from 'src/app/services/location.service';
import { ProduitService } from 'src/app/services/produit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consommation-invoice',
  templateUrl: './consommation-invoice.component.html',
  styleUrls: ['./consommation-invoice.component.scss'],
})
export class ConsommationInvoiceComponent implements OnInit {

  consommationId: number;
  consommation: Consommation;
  client: Client;
  // @ViewChild('pdf', {static: true}) content;

    constructor(
      private printService: PrintService,
      private consommationService: ConsommationService,
      private locationService: LocationService,
      private produitService: ProduitService,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit() {
      let data = this.route.snapshot.params['consommationId']; 
      this.consommationId = + data[0];
      console.log('print :',this.consommationId);
      this.consommation = this.consommationService.getConsommation(this.consommationId);
      console.log(this.consommation);
      if (this.consommation.clientId) this.client = this.locationService.getClient(this.consommation.clientId);
      this.printService.onDataReady("epreuve");
    }
  
    getCategorie(id){
      return this.produitService.getCategorie(id).nom;
    }
  
  }
  