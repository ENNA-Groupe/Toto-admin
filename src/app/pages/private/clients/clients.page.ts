import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  clientSubscription: Subscription;
  clients: Client[];
  clientTrashSubscription: Subscription;
  clientsTrash: Client[];
  trash:boolean = false;
  isDesktop: boolean;
  sub: Subscription;

  constructor(
    private popoverController: PopoverController,
    private data: DataService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.clientSubscription =  this.locationService.getClients().subscribe(
      (res: Client[]) => {
        this.clients = res;
      }
    );
    
    this.clientTrashSubscription =  this.locationService.getClientsTrash().subscribe(
      (res: Client[]) => {
        this.clientsTrash = res;
      }
    );

    this.sub = this.data.isDesktopView().subscribe(
      (res) => this.isDesktop = res
    );
  }

  ngOnDestroy(){
    this.clientSubscription.unsubscribe();
    this.clientSubscription.unsubscribe();
    this.clientTrashSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

}