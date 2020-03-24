import { Injectable } from '@angular/core';
import { Sortie } from '../models/sortie.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  private sorties: Sortie[] = [];
  private sortiesTrash: Sortie[] =[];

  private sortieSubject = new BehaviorSubject<Sortie[]>([]);
  private sortieTrashSubject = new BehaviorSubject<Sortie[]>([]);


  lastId: number = 0;
  lastTrashId: number = 0;
 
  constructor(
    private api: ApiService
  ) {
    
    this.api.getStreamData().subscribe(
      (res) => {
         if (res.operation.model === "Sortie") {
          if (res.operation.typeOperation === 'add') {
            this.sorties.push(res.data);
            this.sortieSubject.next(this.sorties);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.sorties.findIndex(item => item.id === res.data.id);
            this.sorties[i] = res.data;
            this.sortieSubject.next(this.sorties);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.sorties.findIndex(item => item.id === res.data.id);
            this.sorties.splice(i, 1);
            this.sortieSubject.next(this.sorties);
            this.sortiesTrash.push(res.data);
            this.sortieTrashSubject.next(this.sortiesTrash);
            this.sortieSubject.next(this.sorties);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.sortiesTrash.findIndex(item => item.id === res.data.id);
            this.sortiesTrash.splice(i, 1);
            this.sortieTrashSubject.next(this.sortiesTrash);
            this.sorties.push(res.data);
            this.sortieSubject.next(this.sorties);
          }
        }
      }
    );
   }

   loadSortie() {
    this.api.post('sortie:all', this.lastId).then(
      (res: Sortie[]) => {
        res.forEach(item=>this.sorties.push(item));
        this.lastId+=res.length;
        this.sortieSubject.next(this.sorties);
      }
    );
  }

  loadSortieTrash() {
    this.api.post('sortie:trash', this.lastTrashId).then(
      (res: Sortie[]) => {
        res.forEach(item=>this.sorties.push(item));
        this.lastTrashId+=res.length;
        this.sortieTrashSubject.next(this.sortiesTrash);
      }
    );
  }

  getSorties() {
    return this.sortieSubject.asObservable();
  }

  getSortie(id:number){
    return this.sorties.find(item => item.id === id);
  }

  getSortieProduits(id: number){
    return this.api.post('sortie:produits',id).then(
      res => res
    );
  }

  getSortiesTrash() {
    return this.sortieTrashSubject.asObservable();
  }
  addSortie(data: any) {
    return this.api.post('sortie:add', data).then(
      (res: Sortie) => {
        this.sorties.unshift(res);
        this.sortieSubject.next(this.sorties);
      });
  }
  editSortie(data: any) {
    return this.api.post('sortie:edit', data).then(
      (res: Sortie) => {
        let i = this.sorties.findIndex(item => item.id === res.id);
        this.sorties[i] = res;
        this.sortieSubject.next(this.sorties);
      });
  }
  deleteSortie(id: number) {
    return this.api.post('sortie:delete', id).then(
      (res: Sortie) => {
        let i = this.sorties.findIndex(item => item.id === res.id);
        this.sorties.splice(i, 1);
        this.sortieSubject.next(this.sorties);
        this.sortiesTrash.push(res);
        this.sortieTrashSubject.next(this.sortiesTrash);
      });
  }

  restoreSortie(id: number) {
    return this.api.post('sortie:restore', id).then(
      (res: Sortie) => {
        let i = this.sortiesTrash.findIndex(item => item.id === res.id);
        this.sortiesTrash.splice(i, 1);
        this.sortieTrashSubject.next(this.sortiesTrash);
        this.sorties.push(res);
        this.sortieSubject.next(this.sorties);
      });
  }

}
