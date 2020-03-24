import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { Consommation } from '../models/consommation.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConsommationService {

  private tables: Table[];
  private tablesTrash: Table[];
  private consommations: Consommation[] = [];
  private consommationsTrash: Consommation[];

  private consommationProduits: any[] = [];


  private tableSubject = new BehaviorSubject<Table[]>([]);
  private tableTrashSubject = new BehaviorSubject<Table[]>([]);
  private consommationSubject = new BehaviorSubject<Consommation[]>([]);
  private consommationTrashSubject = new BehaviorSubject<Consommation[]>([]);


  constructor(
    private api: ApiService
  ) {

   
    this.api.getStreamData().subscribe(
      (res) => {
        if (res.operation.model === "Table") {
          if (res.operation.tableOperation === 'add') {
            this.tables.push(res.data);
            this.tableSubject.next(this.tables);
          } else if (res.operation.tableOperation === 'edit') {
            let i = this.tables.findIndex(item => item.id === res.data.id);
            this.tables[i] = res.data;
            this.tableSubject.next(this.tables);
          } else if (res.operation.tableOperation === 'delete') {
            let i = this.tables.findIndex(item => item.id === res.data.id);
            this.tables.splice(i, 1);
            this.tableSubject.next(this.tables);
            this.tablesTrash.push(res.data);
            this.tableTrashSubject.next(this.tablesTrash);
            this.tableSubject.next(this.tables);
          } else if (res.operation.tableOperation === 'restore') {
            let i = this.tablesTrash.findIndex(item => item.id === res.data.id);
            this.tablesTrash.splice(i, 1);
            this.tableTrashSubject.next(this.tablesTrash);
            this.tables.push(res.data);
            this.tableSubject.next(this.tables);
          }

        } else if (res.operation.model === "Consommation") {
          if (res.operation.tableOperation === 'add') {
            this.consommations.push(res.data);
            this.consommationSubject.next(this.consommations);
          } else if (res.operation.tableOperation === 'edit') {
            let i = this.consommations.findIndex(item => item.id === res.data.id);
            this.consommations[i] = res.data;
            this.consommationSubject.next(this.consommations);
          } else if (res.operation.tableOperation === 'delete') {
            let i = this.consommations.findIndex(item => item.id === res.data.id);
            this.consommations.splice(i, 1);
            this.consommationSubject.next(this.consommations);
            this.consommationsTrash.push(res.data);
            this.consommationTrashSubject.next(this.consommationsTrash);
            this.consommationSubject.next(this.consommations);
          } else if (res.operation.tableOperation === 'restore') {
            let i = this.consommationsTrash.findIndex(item => item.id === res.data.id);
            this.consommationsTrash.splice(i, 1);
            this.consommationTrashSubject.next(this.consommationsTrash);
            this.consommations.push(res.data);
            this.consommationSubject.next(this.consommations);
          }
        }
      }
    );
  }

  /**
   * table
   */

loadTable(){
  this.api.post('table:all', null).then(
    (res: Table[]) => {
      this.tables = res;
      this.tableSubject.next(this.tables);
    }
  );

}

loadTableTrash(){
  this.api.post('table:trash', null).then(
    (res: Table[]) => {
      this.tablesTrash = res;
      this.tableTrashSubject.next(this.tablesTrash);
    }
  );
}


  getTables() {
    return this.tableSubject.asObservable();
  }

  getTablesTrash() {
    return this.tableTrashSubject.asObservable();
  }

  getTableTrash(id) {
    return this.tablesTrash.find(item => item.id === id);
  }

  getTable(id) {
    return this.tables.find(item => item.id === id);
  }

  addTable(data) {
    return this.api.post('table:add', data).then(
      (res: Table) => {
        this.tables.push(res);
        this.tableSubject.next(this.tables);
      });
  }

  editTable(data) {
    return this.api.post('table:edit', data).then(
      (res: Table) => {
        let i = this.tables.findIndex(item => item.id === res.id);
        this.tables[i] = res;
        this.tableSubject.next(this.tables);
      });
  }

  deleteTable(id) {
    return this.api.post('table:delete', id).then(
      (res: Table) => {
        let i = this.tables.findIndex(item => item.id === res.id);
        this.tables.splice(i, 1);
        this.tableSubject.next(this.tables);
        this.tablesTrash.push(res);
        this.tableTrashSubject.next(this.tablesTrash);
      });
  }

  restoreTable(id) {
    return this.api.post('table:restore', id).then(
      (res: Table) => {
        let i = this.tablesTrash.findIndex(item => item.id === res.id);
        this.tablesTrash.splice(i, 1);
        this.tableTrashSubject.next(this.tablesTrash);
        this.tables.push(res);
        this.tableSubject.next(this.tables);
      });
  }

  /**
  * Consommation
  */

  loadConsommation(){  
  this.api.post('consommation:all', null).then(
    (res: Consommation[]) => {
      console.log(res);
      this.consommations = res;
      this.consommationSubject.next(this.consommations);
    }
  );
  }

  loadConsommationTrash() {
  this.api.post('consommation:trash', null).then(
    (res: Consommation[]) => {
      this.consommationsTrash = res;
      this.consommationTrashSubject.next(this.consommationsTrash);
    }
  );
  }
  
  getConsommations() {
    return this.consommationSubject.asObservable();
  }

  getConsommationsTrash() {
    return this.consommationTrashSubject.asObservable();
  }

  getConsommationTrash(id) {
    return this.consommationsTrash.find(item => item.id === id);
  }

  getConsommation(id) {
    return this.consommations.find(item => item.id === id);
  }
  
  getTableConsommation(tableId) {
    return this.consommations.find(item => item.tableId === tableId);
  }

  getConsommationProduits(id) {
    return this.api.post('consommation:produits', id).then(
      (res: any[]) => this.consommationProduits = res
    );
  }

  getConsommationProduit(consoId, prodId) {
    let c = this.consommations.find(conso => conso.id === consoId);
    return c.products.find(prod => prod.id === prodId);
  }

  chooseClient(data) {
    return this.api.post('consommation:client', data).then(
      (res: Consommation) => {
        let i = this.consommations.findIndex(conso => conso.id === data.consommationId);
          this.consommations[i] = res;
        this.consommationSubject.next(this.consommations);
      });
  }

  addConsommation(data) {
    return this.api.post('consommation:add', data).then(
      (res: Consommation) => {
        this.consommations.push(res);
        this.consommationSubject.next(this.consommations);
      });
  }

  addProdConso(data) {
    return this.api.post('consommation:addProduit', data).then(
      (res: Consommation) => {
        if (res) {
          let i = this.consommations.findIndex(conso => conso.id === data.consommationId);
          this.consommations[i] = res;
          this.consommationSubject.next(this.consommations);
        }
      });
  }

  removeProdConso(data) {
    return this.api.post('consommation:removeProduit', data).then(
      (res: Consommation) => {
        if (res) {
          let i = this.consommations.findIndex(conso => conso.id === data.consommationId);
          this.consommations[i] = res;
          this.consommationSubject.next(this.consommations);
        }
      });
  }

  addProduit(data) {
    return this.api.post('consommation:newProduit', data).then(
      (res: Consommation) => {
        if (res) {
          console.log(res);
          let i = this.consommations.findIndex(conso => conso.id === data.consommationId);
          this.consommations[i] = res;
          this.consommationSubject.next(this.consommations);
        }
      });
  }

  removeProduit(data) {
    return this.api.post('consommation:deleteProduit', data).then(
      (res: Consommation) => {
        if (res) {
          let i = this.consommations.findIndex(conso => conso.id === data.consommationId);
          this.consommations[i] = res;
          this.consommationSubject.next(this.consommations);
        }
      });
  }

  editConsommation(data) {
    return this.api.post('consommation:edit', data).then(
      (res: Consommation) => {
        let i = this.consommations.findIndex(item => item.id === res.id);
        this.consommations[i] = res;
        this.consommationSubject.next(this.consommations);
      });
  }

  deleteConsommation(id) {
    return this.api.post('consommation:delete', id).then(
      (res: Consommation) => {
        let i = this.consommations.findIndex(item => item.id === res.id);
        this.consommations.splice(i, 1);
        this.consommationSubject.next(this.consommations);
        this.consommationsTrash.push(res);
        this.consommationTrashSubject.next(this.consommationsTrash);
      });
  }

  endConso(data) {
    return this.api.post('consommation:end', data).then(
      (res: Consommation) => {
        console.log(res);
        if (res) {
          let i = this.consommations.findIndex(conso => conso.id === data.consommationId);
          this.consommations[i] = res;
          this.consommationSubject.next(this.consommations);
          return true;
        }
      });
  }

  restoreConsommation(id) {
    return this.api.post('consommation:restore', id).then(
      (res: Consommation) => {
        let i = this.consommationsTrash.findIndex(item => item.id === res.id);
        this.consommationsTrash.splice(i, 1);
        this.consommationTrashSubject.next(this.consommationsTrash);
        this.consommations.push(res);
        this.consommationSubject.next(this.consommations);
      });
  }

}
