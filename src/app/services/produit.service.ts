import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Intrant } from '../models/intrant.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
 
  private categories: Categorie[];
  private categoriesTrash: Categorie[];
  private produits: Produit[];
  private produitsTrash: Produit[];
  private intrants: Intrant[];
  private intrantsTrash: Intrant[];


  private categorieSubject = new BehaviorSubject<Categorie[]>([]);
  private categorieTrashSubject = new BehaviorSubject<Categorie[]>([]);
  private produitSubject = new BehaviorSubject<Produit[]>([]);
  private produitTrashSubject = new BehaviorSubject<Produit[]>([]);
  private intrantSubject = new BehaviorSubject<Intrant[]>([]);
  private intrantTrashSubject = new BehaviorSubject<Intrant[]>([]);


  constructor(
    private api: ApiService
  ) {
    this.api.getStreamData().subscribe(
      (res) => {
        if (res.operation.model === "Categorie") {
          if (res.operation.typeOperation === 'add') {
            this.categories.push(res.data);
            this.categorieSubject.next(this.categories);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.categories.findIndex(item => item.id === res.data.id);
            this.categories[i] = res.data;
            this.categorieSubject.next(this.categories);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.categories.findIndex(item => item.id === res.data.id);
            this.categories.splice(i, 1);
            this.categorieSubject.next(this.categories);
            this.categoriesTrash.push(res.data);
            this.categorieTrashSubject.next(this.categoriesTrash);
            this.categorieSubject.next(this.categories);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.categoriesTrash.findIndex(item => item.id === res.data.id);
            this.categoriesTrash.splice(i, 1);
            this.categorieTrashSubject.next(this.categoriesTrash);
            this.categories.push(res.data);
            this.categorieSubject.next(this.categories);
          }

        } else if (res.operation.model === "Produit") {
          if (res.operation.typeOperation === 'add') {
            this.produits.push(res.data);
            this.produitSubject.next(this.produits);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.produits.findIndex(item => item.id === res.data.id);
            this.produits[i] = res.data;
            this.produitSubject.next(this.produits);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.produits.findIndex(item => item.id === res.data.id);
            this.produits.splice(i, 1);
            this.produitSubject.next(this.produits);
            this.produitsTrash.push(res.data);
            this.produitTrashSubject.next(this.produitsTrash);
            this.produitSubject.next(this.produits);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.produitsTrash.findIndex(item => item.id === res.data.id);
            this.produitsTrash.splice(i, 1);
            this.produitTrashSubject.next(this.produitsTrash);
            this.produits.push(res.data);
            this.produitSubject.next(this.produits);
          }
        } else if (res.operation.model === "Intrant") {
          if (res.operation.typeOperation === 'add') {
            this.intrants.push(res.data);
            this.intrantSubject.next(this.intrants);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.intrants.findIndex(item => item.id === res.data.id);
            this.intrants[i] = res.data;
            this.intrantSubject.next(this.intrants);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.intrants.findIndex(item => item.id === res.data.id);
            this.intrants.splice(i, 1);
            this.intrantSubject.next(this.intrants);
            this.intrantsTrash.push(res.data);
            this.intrantTrashSubject.next(this.intrantsTrash);
            this.intrantSubject.next(this.intrants);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.intrantsTrash.findIndex(item => item.id === res.data.id);
            this.intrantsTrash.splice(i, 1);
            this.intrantTrashSubject.next(this.intrantsTrash);
            this.intrants.push(res.data);
            this.intrantSubject.next(this.intrants);
          }
        }
      }
    );
  }

  /**
   * categorie
   */

  loadCategorie(){
    this.api.post('categorie:all', null).then(
      (res: Categorie[]) => {
        this.categories = res;
        this.categorieSubject.next(this.categories);
      }
    );
  }

  loadCategorieTrash(){
    this.api.post('categorie:trash', null).then(
      (res: Categorie[]) => {
        this.categoriesTrash = res;
        this.categorieTrashSubject.next(this.categoriesTrash);
      }
    );
  }
  getCategories() {
    return this.categorieSubject.asObservable();
  }

  getCategoriesTrash() {
    return this.categorieTrashSubject.asObservable();
  }

  getCategorieTrash(id) {
    return this.categoriesTrash.find(item => item.id === id);
  }

  getCategorie(id) {
    return this.categories.find(item => item.id === id);
  }

  addCategorie(data) {
    return this.api.post('categorie:add', data).then(
      (res: Categorie) => {
        this.categories.push(res);
        this.categorieSubject.next(this.categories);
      });
  }

  editCategorie(data) {
    return this.api.post('categorie:edit', data).then(
      (res: Categorie) => {
        let i = this.categories.findIndex(item => item.id === res.id);
        this.categories[i] = res;
        this.categorieSubject.next(this.categories);
      });
  }

  deleteCategorie(id) {
    return this.api.post('categorie:delete', id).then(
      (res: Categorie) => {
        let i = this.categories.findIndex(item => item.id === res.id);
        this.categories.splice(i, 1);
        this.categorieSubject.next(this.categories);
        this.categoriesTrash.push(res);
        this.categorieTrashSubject.next(this.categoriesTrash);
      });
  }

  restoreCategorie(id) {
    return this.api.post('categorie:restore', id).then(
      (res: Categorie) => {
        let i = this.categoriesTrash.findIndex(item => item.id === res.id);
        this.categoriesTrash.splice(i, 1);
        this.categorieTrashSubject.next(this.categoriesTrash);
        this.categories.push(res);
        this.categorieSubject.next(this.categories);
      });
  }

  /**
  * produit
  */

  loadProduit() {  
    this.api.post('produit:all', null).then(
      (res: Produit[]) => {
        this.produits = res;
        this.produitSubject.next(this.produits);
      }
    );
  }

  loadProduitData() {
    this.api.post('produit:trash', null).then(
      (res: Produit[]) => {
        this.produitsTrash = res;
        this.produitTrashSubject.next(this.produitsTrash);
      }
    );
  }

  getProduits() {
    return this.produitSubject.asObservable();
  }

  getProduitsTrash() {
    return this.produitTrashSubject.asObservable();
  }

  getProduitTrash(id) {
    return this.produitsTrash.find(item => item.id === id);
  }

  getProduit(id) {
    return this.produits.find(item => item.id === id);
  }

  getProduitActivites(id: number, lastActiviteId: number) {
    return this.api.post('produit:activites',{produitId: id, lastId: lastActiviteId}).then(
          res => res
      );
  }

  addProduit(data) {
    return this.api.post('produit:add', data).then(
      (res: Produit) => {
        this.produits.push(res);
        this.produitSubject.next(this.produits);
      });
  }

  editProduit(data) {
    return this.api.post('produit:edit', data).then(
      (res: Produit) => {
        let i = this.produits.findIndex(item => item.id === res.id);
        this.produits[i] = res;
        this.produitSubject.next(this.produits);
      });
  }

  deleteProduit(id) {
    return this.api.post('produit:delete', id).then(
      (res: Produit) => {
        let i = this.produits.findIndex(item => item.id === res.id);
        this.produits.splice(i, 1);
        this.produitSubject.next(this.produits);
        this.produitsTrash.push(res);
        this.produitTrashSubject.next(this.produitsTrash);
      });
  }

  restoreProduit(id) {
    return this.api.post('produit:restore', id).then(
      (res: Produit) => {
        let i = this.produitsTrash.findIndex(item => item.id === res.id);
        this.produitsTrash.splice(i, 1);
        this.produitTrashSubject.next(this.produitsTrash);
        this.produits.push(res);
        this.produitSubject.next(this.produits);
      });
  }


  /**
 * intrant
 */

 loadIntrant() {  
  this.api.post('intrant:all', null).then(
    (res: Intrant[]) => {
      this.intrants = res;
      this.intrantSubject.next(this.intrants);
    }
  );
 }

 loadIntrantTrash(){
  this.api.post('intrant:trash', null).then(
    (res: Intrant[]) => {
      this.intrantsTrash = res;
      this.intrantTrashSubject.next(this.intrantsTrash);
    }
  );
 }

  getIntrants() {
    return this.intrantSubject.asObservable();
  }

  getIntrantsTrash() {
    return this.intrantTrashSubject.asObservable();
  }

  getIntrantTrash(id) {
    return this.intrantsTrash.find(item => item.id === id);
  }

  getIntrant(id) {
    return this.intrants.find(item => item.id === id);
  }

  addIntrant(data) {
    return this.api.post('intrant:add', data).then(
      (res: Intrant) => {
        this.intrants.push(res);
        this.intrantSubject.next(this.intrants);
      });
  }

  editIntrant(data) {
    return this.api.post('intrant:edit', data).then(
      (res: Intrant) => {
        let i = this.intrants.findIndex(item => item.id === res.id);
        this.intrants[i] = res;
        this.intrantSubject.next(this.intrants);
      });
  }

  deleteIntrant(id) {
    return this.api.post('intrant:delete', id).then(
      (res: Intrant) => {
        let i = this.intrants.findIndex(item => item.id === res.id);
        this.intrants.splice(i, 1);
        this.intrantSubject.next(this.intrants);
        this.intrantsTrash.push(res);
        this.intrantTrashSubject.next(this.intrantsTrash);
      });
  }

  restoreIntrant(id) {
    return this.api.post('intrant:restore', id).then(
      (res: Intrant) => {
        let i = this.intrantsTrash.findIndex(item => item.id === res.id);
        this.intrantsTrash.splice(i, 1);
        this.intrantTrashSubject.next(this.intrantsTrash);
        this.intrants.push(res);
        this.intrantSubject.next(this.intrants);
      });
  }
}
