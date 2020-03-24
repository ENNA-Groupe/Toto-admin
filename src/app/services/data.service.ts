import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './user.service';
import { ProduitService } from './produit.service';
import { ChambreService } from './chambre.service';
import { EntreeService } from './entree.service';
import { SortieService } from './sortie.service';
import { ParamsService } from './params.service';
import { LocationService } from './location.service';
import { ConsommationService } from './consommation.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchValue: string = '';
  private userSubject = new BehaviorSubject<User>(null);
  private controlsSubject = new BehaviorSubject(null);

  private isDesktop = new BehaviorSubject(false);
  private isAuth = false;
  constructor(
    // private user: UserService,
    // private produit: ProduitService,
    // private chambre: ChambreService,
    // private entree: EntreeService,
    // private sortie: SortieService,
    // private params: ParamsService,
    // private location: LocationService,
    // private consommation: ConsommationService
  ) {

  }


  setAuth(isAuth) {
    this.isAuth = isAuth;
  }

  getAuth(){
    return this.isAuth;
  }

  setUser(user) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  setData(obj: string, data: any[]) {
    switch(obj) {
      case 'user':
        data.forEach(item => new User(item));
      break;
    }
  }

  setStreamData(data) {
    data.forEach(elem => {
      switch(elem.model) {
        case 'User':
          new User(elem.data);
        break;
      }
    });
  }

  setControls(controls) {
    console.log(controls);
    this.controlsSubject.next(controls);
    controls.forEach(item => {
      if (item.isChecked && item.operation === "all") {
        switch (item.groupe) {
          // case 'fonction':
          //   this.user.loadFonction();
          //   break;
          // case 'user':
          //   this.user.loadUser();
          //   break;
          // case 'categorie':
          //   this.produit.loadCategorie();
          //   break;
          // case 'produit':
          //   this.produit.loadProduit();
          //   break;
          // case 'intrant':
          //   this.produit.loadIntrant();
          //   break;
          // case 'type':
          //   this.chambre.loadType();
          //   break;
          // case 'chambre':
          //   this.chambre.loadChambre();
          //   break;
          // case 'fournisseur':
          //   this.entree.loadFournisseur();
          //   break;
          // case 'sortie':
          //   this.sortie.loadSortie();
          //   break;
          // case 'table':
          //   this.consommation.loadTable();
          //   break;
          // case 'consommation':
          //   this.consommation.loadConsommation();
          //   break;
          // case 'client':
          //   this.location.loadClient();
          //   break;
          // case 'location':
          //   this.location.loadLocation();
          //   break;
          // case 'propriete':
          //   this.params.loadPropriete();
          //   break;
          // case 'mesure':
          //   this.params.loadMesure();
          //   break;
        }
      }
    });
  }

  getControls() {
    return this.controlsSubject.asObservable();
  }

  onResize(size) {
    if (size < 568) {
      this.isDesktop.next(false);
    } else this.isDesktop.next(true);
  }

  isDesktopView(): Observable<boolean> {
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }
}
