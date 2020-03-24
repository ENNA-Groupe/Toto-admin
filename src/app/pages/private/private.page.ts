import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  isSearching: boolean = false;
  sub: Subscription;
  isDesktop: boolean;

  // appPages = [
  //   {
  //     title: 'Dashboard',
  //     url: '/private/dashboard',
  //     icon: 'apps-outline'
  //   },
  //   {

  //     title: 'Location',
  //     url: '/private/locations',
  //     icon: 'bed-outline'
  //   },
  //   {
  //     title: 'Consommation',
  //     url: '/private/consommations',
  //     icon: 'beer-outline'
  //   },
  //   {
  //     title: 'Chambres',
  //     url: '/private/chambres',
  //     icon: 'home-outline'
  //   },
  //   {
  //     title: 'Produits',
  //     url: '/private/produits',
  //     icon: 'basket-outline'
  //   },
  //   {
  //     title: 'Intrants',
  //     url: '/private/intrants',
  //     icon: 'archive-outline'
  //   },
  //   {
  //     title: 'Entrees',
  //     url: '/private/entrees',
  //     icon: 'return-down-back-outline'
  //   },
  //   {
  //     title: 'Sorties',
  //     url: '/private/sorties',
  //     icon: 'return-down-forward-outline'
  //   },
  //   {
  //     title: 'Utilisateurs',
  //     url: '/private/users',
  //     icon: 'people-outline'
  //   },
  //   {
  //     title: 'Clients',
  //     url: '/private/clients',
  //     icon: 'person-outline'
  //   },
  //   {
  //     title: 'Fournisseurs',
  //     url: '/private/fournisseurs',
  //     icon: 'clipboard-outline'
  //   },
  //   {
  //     title: 'Parametres',
  //     url: '/private/params',
  //     icon: 'cog-outline'
  //   },
  //   {
  //     title: 'Stats',
  //     url: '/private/stats',
  //     icon: 'stats-chart-outline'
  //   }
  // ];
  appPages = [
    {
      title: 'Accueil',
      url: '/private/accueil',
      icon: 'apps-outline'
    },
    {
      title: 'Employés et Renumération',
      url: '/private/users',
      icon: 'basket-outline'
    },
    {
      title: 'Clients',
      url: '/private/clients',
      icon: 'person-outline'
    },
    {
      title: 'Engins',
      url: '/private/engins',
      icon: 'beer-outline'
    },
    {
      title: 'Tarifs',
      url: '/private/tarifs',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Coursiers',
      url: '/private/coursiers',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Statistiques',
      url: '/private/stats',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Reglages',
      url: '/private/params',
      icon: 'cog-outline'
    }
  ];
  loggedIn = false;
  dark = false;
  user: any = { id: null, identifiant: '', password: '', nom: 'TEST', prenom: 'Test', photo: './assets/img/user.png', contact1: '90909090', salaire: 0, contact2: '99009900', createdAt: '', deletedAt: '', updatedAt: '' };
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  subs: Subscription[] = [];
  controls: any[];

  constructor(
    private menu: MenuController,
    private auth: AuthService,
    private api: ApiService,
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub1 = this.data.isDesktopView().subscribe(
      res => {
        this.isDesktop = res;
      }
    );

    this.sub2 = this.data.getUser().subscribe(
      user => {
        if (user) {
          this.user = user;
          this.sub3 = this.data.getControls().subscribe(
            controls => {
              this.controls = controls;
              this.controls.forEach((element, i) => {
                let event = element.groupe + ':all';
                this.subs[i] = this.api.get(event).subscribe(
                  (res: any[]) => this.data.setData(element.groupe, res)
                );
              });
            }
          );
        }
      }
    );
  }

  onSearch(val) {
    this.data.searchValue = '';
    this.isSearching = val;
  }

  onLogout() {
    this.auth.logout().then(
      res => {
        if (res) this.router.navigate(['']);
      }
    );
  }

}
