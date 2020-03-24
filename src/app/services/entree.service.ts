import { Injectable } from '@angular/core';
import { Entree } from '../models/entree.model';
import { Fournisseur } from '../models/fournisseur.model';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Chambre } from '../models/chambre.model';

@Injectable({
  providedIn: 'root'
})
export class EntreeService {
  private fournisseurs: Fournisseur[];
  private fournisseursTrash: Fournisseur[];
  private entrees: Entree[] = [];
  private entreesTrash: Entree[] =[];
  lastId: number = 0;
  lastTrashId: number = 0;

  private fournisseurSubject = new BehaviorSubject<Fournisseur[]>([]);
  private fournisseurTrashSubject = new BehaviorSubject<Fournisseur[]>([]);
  private entreeSubject = new BehaviorSubject<Entree[]>([]);
  private entreeTrashSubject = new BehaviorSubject<Entree[]>([]);


  constructor(
    private api: ApiService
  ) {
    this.api.getStreamData().subscribe(
      (res) => {
        if (res.operation.model === "Fournisseur") {
          if (res.operation.typeOperation === 'add') {
            this.fournisseurs.push(res.data);
            this.fournisseurSubject.next(this.fournisseurs);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.fournisseurs.findIndex(item => item.id === res.data.id);
            this.fournisseurs[i] = res.data;
            this.fournisseurSubject.next(this.fournisseurs);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.fournisseurs.findIndex(item => item.id === res.data.id);
            this.fournisseurs.splice(i, 1);
            this.fournisseurSubject.next(this.fournisseurs);
            this.fournisseursTrash.push(res.data);
            this.fournisseurTrashSubject.next(this.fournisseursTrash);
            this.fournisseurSubject.next(this.fournisseurs);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.fournisseursTrash.findIndex(item => item.id === res.data.id);
            this.fournisseursTrash.splice(i, 1);
            this.fournisseurTrashSubject.next(this.fournisseursTrash);
            this.fournisseurs.push(res.data);
            this.fournisseurSubject.next(this.fournisseurs);
          }

        } else if (res.operation.model === "Entree") {
          if (res.operation.typeOperation === 'add') {
            this.entrees.push(res.data);
            this.entreeSubject.next(this.entrees);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.entrees.findIndex(item => item.id === res.data.id);
            this.entrees[i] = res.data;
            this.entreeSubject.next(this.entrees);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.entrees.findIndex(item => item.id === res.data.id);
            this.entrees.splice(i, 1);
            this.entreeSubject.next(this.entrees);
            this.entreesTrash.push(res.data);
            this.entreeTrashSubject.next(this.entreesTrash);
            this.entreeSubject.next(this.entrees);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.entreesTrash.findIndex(item => item.id === res.data.id);
            this.entreesTrash.splice(i, 1);
            this.entreeTrashSubject.next(this.entreesTrash);
            this.entrees.push(res.data);
            this.entreeSubject.next(this.entrees);
          }
        }
      }
    );
  }

  /**
   * type
   */

   loadFournisseur(){
    this.api.post('fournisseur:all', null).then(
      (res: Fournisseur[]) => {
        this.fournisseurs = res;
        this.fournisseurSubject.next(this.fournisseurs);
      }
    );
   }

   loadFournisseurTrash(){
    this.api.post('fournisseur:trash', null).then(
      (res: Fournisseur[]) => {
        this.fournisseursTrash = res;
        this.fournisseurTrashSubject.next(this.fournisseursTrash);
      }
    );
   }

  getFournisseurs() {
    return this.fournisseurSubject.asObservable();
  }

  getFournisseursTrash() {
    return this.fournisseurTrashSubject.asObservable();
  }

  getFournisseurTrash(id) {
    return this.fournisseursTrash.find(item => item.id === id);
  }

  getFournisseur(id) {
    return this.fournisseurs.find(item => item.id === id);
  }

  addFournisseur(data) {
    return this.api.post('fournisseur:add', data).then(
      (res: Fournisseur) => {
        this.fournisseurs.push(res);
        this.fournisseurSubject.next(this.fournisseurs);
      });
  }

  editFournisseur(data) {
    return this.api.post('fournisseur:edit', data).then(
      (res: Fournisseur) => {
        let i = this.fournisseurs.findIndex(item => item.id === res.id);
        this.fournisseurs[i] = res;
        this.fournisseurSubject.next(this.fournisseurs);
      });
  }

  deleteFournisseur(id) {
    return this.api.post('fournisseur:delete', id).then(
      (res: Fournisseur) => {
        let i = this.fournisseurs.findIndex(item => item.id === res.id);
        this.fournisseurs.splice(i, 1);
        this.fournisseurSubject.next(this.fournisseurs);
        this.fournisseursTrash.push(res);
        this.fournisseurTrashSubject.next(this.fournisseursTrash);
      });
  }

  restoreFournisseur(id) {
    return this.api.post('fournisseur:restore', id).then(
      (res: Fournisseur) => {
        let i = this.fournisseursTrash.findIndex(item => item.id === res.id);
        this.fournisseursTrash.splice(i, 1);
        this.fournisseurTrashSubject.next(this.fournisseursTrash);
        this.fournisseurs.push(res);
        this.fournisseurSubject.next(this.fournisseurs);
      });
  }

  /**
  * Chambre
  */


  loadEntrees(){
    this.api.post('entree:all', this.lastId).then(
      (res: Entree[]) => {
        res.forEach(item=>this.entrees.push(item));
        this.lastId+=res.length;
        this.entreeSubject.next(this.entrees);
      }
    );
  }

  loadEntreesTrash(){
    this.api.post('entree:trash', this.lastTrashId).then(
      (res: Entree[]) => {
        res.forEach(item=>this.entrees.push(item));
        this.lastTrashId+=res.length;
        this.entreeTrashSubject.next(this.entreesTrash);
      }
    );

  }

  getEntrees() {
    return this.entreeSubject.asObservable();
  }
  
  getEntreeProduits(id){
    return this.api.post('entree:produits',id).then(
      res => res
    );
  }

  getEntreesTrash() {
    return this.entreeTrashSubject.asObservable();
  }

  getEntreeTrash(id) {
    return this.entreesTrash.find(item => item.id === id);
  }

  getEntree(id) {
    return this.entrees.find(item => item.id === id);
  }

  addEntree(data) {
    return this.api.post('entree:add', data).then(
      (res: Entree) => {
        this.entrees.unshift(res);
        this.entreeSubject.next(this.entrees);
      });
  }

  editEntree(data) {
    return this.api.post('entree:edit', data).then(
      (res: Entree) => {
        let i = this.entrees.findIndex(item => item.id === res.id);
        this.entrees[i] = res;
        this.entreeSubject.next(this.entrees);
      });
  }

  deleteEntree(id) {
    return this.api.post('entree:delete', id).then(
      (res: Entree) => {
        let i = this.entrees.findIndex(item => item.id === res.id);
        this.entrees.splice(i, 1);
        this.entreeSubject.next(this.entrees);
        this.entreesTrash.push(res);
        this.entreeTrashSubject.next(this.entreesTrash);
      });
  }
  
  restoreEntree(id) {
    return this.api.post('entree:restore', id).then(
      (res: Entree) => {
        let i = this.entreesTrash.findIndex(item => item.id === res.id);
        this.entreesTrash.splice(i, 1);
        this.entreeTrashSubject.next(this.entreesTrash);
        this.entrees.push(res);
        this.entreeSubject.next(this.entrees);
      });
  }

}