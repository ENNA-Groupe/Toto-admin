import { Injectable } from '@angular/core';
import { Propriete } from '../models/propriete.model';
import { Control } from '../models/control.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Mesure } from '../models/mesure.model';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private controls: Control[];
  private controlsTrash: Control[];
  private proprietes: Propriete[];
  private proprietesTrash: Propriete[];
  private mesures: Mesure[] = [];
  private mesuresTrash: Mesure[];


  private controlSubject = new BehaviorSubject<Control[]>([]);
  private controlTrashSubject = new BehaviorSubject<Control[]>([]);
  private proprieteSubject = new BehaviorSubject<Propriete[]>([]);
  private proprieteTrashSubject = new BehaviorSubject<Propriete[]>([]);
  private mesureSubject = new BehaviorSubject<Mesure[]>([]);
  private mesureTrashSubject = new BehaviorSubject<Mesure[]>([]);

  constructor(
    private api: ApiService
  ) {
    this.api.getStreamData().subscribe(
      (res) => {
        if (res.operation.model === "control") {
          if (res.operation.typeOperation === 'add') {
            this.controls.push(res.data);
            this.controlSubject.next(this.controls);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.controls.findIndex(item => item.id === res.data.id);
            this.controls[i] = res.data;
            this.controlSubject.next(this.controls);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.controls.findIndex(item => item.id === res.data.id);
            this.controls.splice(i, 1);
            this.controlSubject.next(this.controls);
            this.controlsTrash.push(res.data);
            this.controlTrashSubject.next(this.controlsTrash);
            this.controlSubject.next(this.controls);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.controlsTrash.findIndex(item => item.id === res.data.id);
            this.controlsTrash.splice(i, 1);
            this.controlTrashSubject.next(this.controlsTrash);
            this.controls.push(res.data);
            this.controlSubject.next(this.controls);
          }

        } else if (res.operation.model === "propriete") {
          if (res.operation.typeOperation === 'add') {
            this.proprietes.push(res.data);
            this.proprieteSubject.next(this.proprietes);
          } else if (res.operation.typeOperation === 'edit') {
            let i = this.proprietes.findIndex(item => item.id === res.data.id);
            this.proprietes[i] = res.data;
            this.proprieteSubject.next(this.proprietes);
          } else if (res.operation.typeOperation === 'delete') {
            let i = this.proprietes.findIndex(item => item.id === res.data.id);
            this.proprietes.splice(i, 1);
            this.proprieteSubject.next(this.proprietes);
            this.proprietesTrash.push(res.data);
            this.proprieteTrashSubject.next(this.proprietesTrash);
            this.proprieteSubject.next(this.proprietes);
          } else if (res.operation.typeOperation === 'restore') {
            let i = this.proprietesTrash.findIndex(item => item.id === res.data.id);
            this.proprietesTrash.splice(i, 1);
            this.proprieteTrashSubject.next(this.proprietesTrash);
            this.proprietes.push(res.data);
            this.proprieteSubject.next(this.proprietes);
          }
        }
      }
    );
  }

  /**
   * Control
   */


  getUserControls(id) {
    return this.api.post('control:user', id).then(
      (res: any) => {
        console.log(res);
        return res;
      });
  }

  saveUserControls(data) {
    return this.api.post('control:save', data).then(
      (res: any) => {
        return res;
      });
  }

  getControls() {
    return this.controlSubject.asObservable();
  }

  getControlsTrash() {
    return this.controlTrashSubject.asObservable();
  }

  getControlTrash(id) {
    return this.controlsTrash.find(item => item.id === id);
  }

  getControl(id) {
    return this.controls.find(item => item.id === id);
  }

  addControl(data) {
    return this.api.post('control:add', data).then(
      (res: Control) => {
        this.controls.push(res);
        this.controlSubject.next(this.controls);
      });
  }

  editControl(data) {
    return this.api.post('control:edit', data).then(
      (res: Control) => {
        let i = this.controls.findIndex(item => item.id === res.id);
        this.controls[i] = res;
        this.controlSubject.next(this.controls);
      });
  }

  deleteControl(id) {
    return this.api.post('control:delete', id).then(
      (res: Control) => {
        let i = this.controls.findIndex(item => item.id === res.id);
        this.controls.splice(i, 1);
        this.controlSubject.next(this.controls);
        this.controlsTrash.push(res);
        this.controlTrashSubject.next(this.controlsTrash);
      });
  }

  restoreControl(id) {
    return this.api.post('control:restore', id).then(
      (res: Control) => {
        let i = this.controlsTrash.findIndex(item => item.id === res.id);
        this.controlsTrash.splice(i, 1);
        this.controlTrashSubject.next(this.controlsTrash);
        this.controls.push(res);
        this.controlSubject.next(this.controls);
      });
  }

  /**
  * Propriete
  */

  loadPropriete() {
    this.api.post('propriete:all', null).then(
      (res: Propriete[]) => {
        this.proprietes = res;
        this.proprieteSubject.next(this.proprietes);
      }
    );
  }


  loadProprieteTrash() {
    this.api.post('propriete:trash', null).then(
      (res: Propriete[]) => {
        this.proprietesTrash = res;
        this.proprieteTrashSubject.next(this.proprietesTrash);
      }
    );
  }

  getChambreProprietes(id) {
    return this.api.post('propriete:chambre', id).then(
      (res: any) => {
        console.log(res);
        return res;
      });
  }

  saveChambreProprietes(data) {
    return this.api.post('propriete:save', data).then(
      (res: any) => {
        return res;
      });
  }

  getProprietes() {
    return this.proprieteSubject.asObservable();
  }

  getProprietesTrash() {
    return this.proprieteTrashSubject.asObservable();
  }

  getProprieteTrash(id) {
    return this.proprietesTrash.find(item => item.id === id);
  }

  getPropriete(id) {
    return this.proprietes.find(item => item.id === id);
  }

  addPropriete(data) {
    return this.api.post('propriete:add', data).then(
      (res: Propriete) => {
        this.proprietes.push(res);
        this.proprieteSubject.next(this.proprietes);
      });
  }

  editPropriete(data) {
    return this.api.post('propriete:edit', data).then(
      (res: Propriete) => {
        let i = this.proprietes.findIndex(item => item.id === res.id);
        this.proprietes[i] = res;
        this.proprieteSubject.next(this.proprietes);
      });
  }

  deletePropriete(id) {
    return this.api.post('propriete:delete', id).then(
      (res: Propriete) => {
        let i = this.proprietes.findIndex(item => item.id === res.id);
        this.proprietes.splice(i, 1);
        this.proprieteSubject.next(this.proprietes);
        this.proprietesTrash.push(res);
        this.proprieteTrashSubject.next(this.proprietesTrash);
      });
  }
  restorePropriete(id) {
    return this.api.post('propriete:restore', id).then(
      (res: Propriete) => {
        let i = this.proprietesTrash.findIndex(item => item.id === res.id);
        this.proprietesTrash.splice(i, 1);
        this.proprieteTrashSubject.next(this.proprietesTrash);
        this.proprietes.push(res);
        this.proprieteSubject.next(this.proprietes);
      });
  }

  /**
   * MESURE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
   */

  loadMesure() {
    this.api.post('mesure:all', null).then(
      (res: Mesure[]) => {
        this.mesures = res;
        this.mesureSubject.next(this.mesures);
      }
    );
  }
  
  loadMesureTrash() {
    this.api.post('mesure:trash', null).then(
      (res: Mesure[]) => {
        this.mesuresTrash = res;
        this.mesureTrashSubject.next(this.mesuresTrash);
      }
    );
  }

  getChambreMesures(id) {
    return this.api.post('mesure:chambre', id).then(
      (res: any) => {
        console.log(res);
        return res;
      });
  }

  getMesures() {
    return this.mesureSubject.asObservable();
  }

  getMesuresTrash() {
    return this.mesureTrashSubject.asObservable();
  }

  getMesureTrash(id) {
    return this.mesuresTrash.find(item => item.id === id);
  }

  getMesure(id) {
    return this.mesures.find(item => item.id === id);
  }

  addMesure(data) {
    return this.api.post('mesure:add', data).then(
      (res: Mesure) => {
        this.mesures.push(res);
        this.mesureSubject.next(this.mesures);
      });
  }

  editMesure(data) {
    return this.api.post('mesure:edit', data).then(
      (res: Mesure) => {
        let i = this.mesures.findIndex(item => item.id === res.id);
        this.mesures[i] = res;
        this.mesureSubject.next(this.mesures);
      });
  }

  deleteMesure(id) {
    return this.api.post('mesure:delete', id).then(
      (res: Mesure) => {
        let i = this.mesures.findIndex(item => item.id === res.id);
        this.mesures.splice(i, 1);
        this.mesureSubject.next(this.mesures);
        this.mesuresTrash.push(res);
        this.mesureTrashSubject.next(this.mesuresTrash);
      });
  }

  restoreMesure(id) {
    return this.api.post('mesure:restore', id).then(
      (res: Mesure) => {
        let i = this.mesuresTrash.findIndex(item => item.id === res.id);
        this.mesuresTrash.splice(i, 1);
        this.mesureTrashSubject.next(this.mesuresTrash);
        this.mesures.push(res);
        this.mesureSubject.next(this.mesures);
      });
  }

}
