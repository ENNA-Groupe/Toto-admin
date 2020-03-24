import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Location } from '../models/location.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private clients: Client[];
  private clientsTrash: Client[];
  private locations: Location[];
  private locationsTrash: Location[];
  private clientSubject = new BehaviorSubject<Client[]>([]);
  private clientTrashSubject = new BehaviorSubject<Client[]>([]);
  private locationSubject = new BehaviorSubject<Location[]>([]);
  private locationTrashSubject = new BehaviorSubject<Location[]>([]);


  constructor(
    private api: ApiService
  ) {

    this.api.getStreamData().subscribe(
      (res) => {
        if (res.operation.model === "Client") {
          if (res.operation.tableOperation === 'add') {
            this.clients.push(res.data);
            this.clientSubject.next(this.clients);
          } else if (res.operation.tableOperation === 'edit') {
            let i = this.clients.findIndex(item => item.id === res.data.id);
            this.clients[i] = res.data;
            this.clientSubject.next(this.clients);
          } else if (res.operation.tableOperation === 'delete') {
            let i = this.clients.findIndex(item => item.id === res.data.id);
            this.clients.splice(i, 1);
            this.clientSubject.next(this.clients);
            this.clientsTrash.push(res.data);
            this.clientTrashSubject.next(this.clientsTrash);
            this.clientSubject.next(this.clients);
          } else if (res.operation.tableOperation === 'restore') {
            let i = this.clientsTrash.findIndex(item => item.id === res.data.id);
            this.clientsTrash.splice(i, 1);
            this.clientTrashSubject.next(this.clientsTrash);
            this.clients.push(res.data);
            this.clientSubject.next(this.clients);
          }

        } else if (res.operation.model === "Location") {
          if (res.operation.tableOperation === 'add') {
            this.locations.push(res.data);
            this.locationSubject.next(this.locations);
          } else if (res.operation.tableOperation === 'edit') {
            let i = this.locations.findIndex(item => item.id === res.data.id);
            this.locations[i] = res.data;
            this.locationSubject.next(this.locations);
          } else if (res.operation.tableOperation === 'delete') {
            let i = this.locations.findIndex(item => item.id === res.data.id);
            this.locations.splice(i, 1);
            this.locationSubject.next(this.locations);
            this.locationsTrash.push(res.data);
            this.locationTrashSubject.next(this.locationsTrash);
            this.locationSubject.next(this.locations);
          } else if (res.operation.tableOperation === 'restore') {
            let i = this.locationsTrash.findIndex(item => item.id === res.data.id);
            this.locationsTrash.splice(i, 1);
            this.locationTrashSubject.next(this.locationsTrash);
            this.locations.push(res.data);
            this.locationSubject.next(this.locations);
          }
        }
      }
    );
  }

  /**
   * client
   */

   loadClient() {
    this.api.post('client:all', null).then(
      (res: Client[]) => {
        this.clients = res;
        this.clientSubject.next(this.clients);
      }
    );
   }

   loadClientTrash() {
    this.api.post('client:trash', null).then(
      (res: Client[]) => {
        this.clientsTrash = res;
        this.clientTrashSubject.next(this.clientsTrash);
      }
    );
   }

  getClients() {
    return this.clientSubject.asObservable();
  }

  getClientsTrash() {
    return this.clientTrashSubject.asObservable();
  }

  getClientTrash(id) {
    return this.clientsTrash.find(item => item.id === id);
  }

  getClient(id) {
    return this.clients.find(item => item.id === id);
  }

  addClient(data) {
    return this.api.post('client:add', data).then(
      (res: Client) => {
        this.clients.push(res);
        this.clientSubject.next(this.clients);
        return res;
      });
  }

  editClient(data) {
    return this.api.post('client:edit', data).then(
      (res: Client) => {
        let i = this.clients.findIndex(item => item.id === res.id);
        this.clients[i] = res;
        this.clientSubject.next(this.clients);
      });
  }

  deleteClient(id) {
    return this.api.post('client:delete', id).then(
      (res: Client) => {
        let i = this.clients.findIndex(item => item.id === res.id);
        this.clients.splice(i, 1);
        this.clientSubject.next(this.clients);
        this.clientsTrash.push(res);
        this.clientTrashSubject.next(this.clientsTrash);
      });
  }

  restoreClient(id) {
    return this.api.post('client:restore', id).then(
      (res: Client) => {
        let i = this.clientsTrash.findIndex(item => item.id === res.id);
        this.clientsTrash.splice(i, 1);
        this.clientTrashSubject.next(this.clientsTrash);
        this.clients.push(res);
        this.clientSubject.next(this.clients);
      });
  }

  /**
  * location
  */

  loadLocation(){
    this.api.post('location:all', null).then(
      (res: Location[]) => {
        this.locations = res;
        this.locationSubject.next(this.locations);
      }
    );
  }

  loadLocationTrash(){
    this.api.post('location:trash', null).then(
      (res: Location[]) => {
        this.locationsTrash = res;
        this.locationTrashSubject.next(this.locationsTrash);
      }
    );
  }

  getLocations() {
    return this.locationSubject.asObservable();
  }

  getLocationsTrash() {
    return this.locationTrashSubject.asObservable();
  }

  getLocationTrash(id) {
    return this.locationsTrash.find(item => item.id === id);
  }

  getLocation(id) {
    return this.locations.find(item => item.id === id);
  }
  getLocationOptions(id) {
    return this.api.post('location:proprietes', {locationId: id}).then(
      res => res
    )
  }

  getLocationProduits(id){
    return this.api.post('location:produits',id).then(
      res => res
    );
  }

  addLocation(data) {
    return this.api.post('location:add', data).then(
      (res: Location) => {
        this.locations.push(res);
        this.locationSubject.next(this.locations);
      });
  }

  editLocation(data) {
    return this.api.post('location:edit', data).then(
      (res: Location) => {
        let i = this.locations.findIndex(item => item.id === res.id);
        this.locations[i] = res;
        this.locationSubject.next(this.locations);
      });
  }

  deleteLocation(id) {
    return this.api.post('location:delete', id).then(
      (res: Location) => {
        let i = this.locations.findIndex(item => item.id === res.id);
        this.locations.splice(i, 1);
        this.locationSubject.next(this.locations);
        this.locationsTrash.push(res);
        this.locationTrashSubject.next(this.locationsTrash);
      });
  }
  
  restoreLocation(id) {
    return this.api.post('location:restore', id).then(
      (res: Location) => {
        let i = this.locationsTrash.findIndex(item => item.id === res.id);
        this.locationsTrash.splice(i, 1);
        this.locationTrashSubject.next(this.locationsTrash);
        this.locations.push(res);
        this.locationSubject.next(this.locations);
      });
  }


}
