import { Injectable } from '@angular/core';
import { Type } from '../models/type.model';
import { Chambre } from '../models/chambre.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  private types: Type[];
  private typesTrash: Type[];
  private chambres: Chambre[];
  private chambresTrash: Chambre[];


  private typeSubject = new BehaviorSubject<Type[]>([]);
  private typeTrashSubject = new BehaviorSubject<Type[]>([]);
  private chambreSubject = new BehaviorSubject<Chambre[]>([]);
  private chambreTrashSubject = new BehaviorSubject<Chambre[]>([]);


  constructor(
    private api: ApiService
  ) {
    this.api.getStreamData().subscribe(
      (res) => {
        if (res.operation.model === "Type") {
          if (res.operation.typeOperation === 'add') {
            this.types.push(res.data);
            this.typeSubject.next(this.types);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.types.findIndex(item => item.id === res.data.id);
            this.types[i] = res.data;
            this.typeSubject.next(this.types);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.types.findIndex(item => item.id === res.data.id);
            this.types.splice(i, 1);
            this.typeSubject.next(this.types);
            this.typesTrash.push(res.data);
            this.typeTrashSubject.next(this.typesTrash);
            this.typeSubject.next(this.types);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.typesTrash.findIndex(item => item.id === res.data.id);
            this.typesTrash.splice(i, 1);
            this.typeTrashSubject.next(this.typesTrash);
            this.types.push(res.data);
            this.typeSubject.next(this.types);
          }

        } else if (res.operation.model === "Chambre") {
          if (res.operation.typeOperation === 'add') {
            this.chambres.push(res.data);
            this.chambreSubject.next(this.chambres);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.chambres.findIndex(item => item.id === res.data.id);
            this.chambres[i] = res.data;
            this.chambreSubject.next(this.chambres);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.chambres.findIndex(item => item.id === res.data.id);
            this.chambres.splice(i, 1);
            this.chambreSubject.next(this.chambres);
            this.chambresTrash.push(res.data);
            this.chambreTrashSubject.next(this.chambresTrash);
            this.chambreSubject.next(this.chambres);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.chambresTrash.findIndex(item => item.id === res.data.id);
            this.chambresTrash.splice(i, 1);
            this.chambreTrashSubject.next(this.chambresTrash);
            this.chambres.push(res.data);
            this.chambreSubject.next(this.chambres);
          }
        }
      }
    );
  }

  /**
   * type
   */

   loadType() {
    this.api.post('type:all', null).then(
      (res: Type[]) => {
        this.types = res;
        this.typeSubject.next(this.types);
      }
    );

   }

   loadTypeTrash() {
    this.api.post('type:trash', null).then(
      (res: Type[]) => {
        this.typesTrash = res;
        this.typeTrashSubject.next(this.typesTrash);
      }
    );

   }

  getTypes() {
    return this.typeSubject.asObservable();
  }

  getTypesTrash() {
    return this.typeTrashSubject.asObservable();
  }

  getTypeTrash(id) {
    return this.typesTrash.find(item => item.id === id);
  }

  getType(id) {
    return this.types.find(item => item.id === id);
  }

  addType(data) {
    return this.api.post('type:add', data).then(
      (res: Type) => {
        this.types.push(res);
        this.typeSubject.next(this.types);
      });
  }

  editType(data) {
    return this.api.post('type:edit', data).then(
      (res: Type) => {
        let i = this.types.findIndex(item => item.id === res.id);
        this.types[i] = res;
        this.typeSubject.next(this.types);
      });
  }

  deleteType(id) {
    return this.api.post('type:delete', id).then(
      (res: Type) => {
        let i = this.types.findIndex(item => item.id === res.id);
        this.types.splice(i, 1);
        this.typeSubject.next(this.types);
        this.typesTrash.push(res);
        this.typeTrashSubject.next(this.typesTrash);
      });
  }

  restoreType(id) {
    return this.api.post('type:restore', id).then(
      (res: Type) => {
        let i = this.typesTrash.findIndex(item => item.id === res.id);
        this.typesTrash.splice(i, 1);
        this.typeTrashSubject.next(this.typesTrash);
        this.types.push(res);
        this.typeSubject.next(this.types);
      });
  }

  /**
  * Chambre
  */

  loadChambre() {
    this.api.post('chambre:all', null).then(
      (res: Chambre[]) => {
        this.chambres = res;
        this.chambreSubject.next(this.chambres);
      }
    );
  }

  loadChambreTrash(){
    this.api.post('chambre:trash', null).then(
      (res: Chambre[]) => {
        this.chambresTrash = res;
        this.chambreTrashSubject.next(this.chambresTrash);
      }
    );
  }

  getChambres() {
    return this.chambreSubject.asObservable();
  }

  getChambresTrash() {
    return this.chambreTrashSubject.asObservable();
  }

  getChambreTrash(id) {
    return this.chambresTrash.find(item => item.id === id);
  }

  getChambre(id) {
    return this.chambres.find(item => item.id === id);
  }

  addChambre(data) {
    return this.api.post('chambre:add', data).then(
      (res: Chambre) => {
        this.chambres.push(res);
        this.chambreSubject.next(this.chambres);
      });
  }

  editChambre(data) {
    return this.api.post('chambre:edit', data).then(
      (res: Chambre) => {
        let i = this.chambres.findIndex(item => item.id === res.id);
        this.chambres[i] = res;
        this.chambreSubject.next(this.chambres);
      });
  }

  deleteChambre(id) {
    return this.api.post('chambre:delete', id).then(
      (res: Chambre) => {
        let i = this.chambres.findIndex(item => item.id === res.id);
        this.chambres.splice(i, 1);
        this.chambreSubject.next(this.chambres);
        this.chambresTrash.push(res);
        this.chambreTrashSubject.next(this.chambresTrash);
      });
  }
  
  restoreChambre(id) {
    return this.api.post('chambre:restore', id).then(
      (res: Chambre) => {
        let i = this.chambresTrash.findIndex(item => item.id === res.id);
        this.chambresTrash.splice(i, 1);
        this.chambreTrashSubject.next(this.chambresTrash);
        this.chambres.push(res);
        this.chambreSubject.next(this.chambres);
      });
  }

  getChambreActivites(chambreId, lastId){
    return this.api.post('chambre:activites',{chambreId: chambreId, lastId: lastId}).then(
      res => res
    );
  }

}
