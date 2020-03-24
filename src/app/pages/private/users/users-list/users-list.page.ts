import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UsersData } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit, OnDestroy {

  users: User[];
  isDesktop: boolean;
  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private usersData: UsersData,
    private dataService: DataService,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.sub1 = this.usersData.getAll().subscribe(
      (res) => {
        this.users = res;
      }
    );

    this.dataService.isDesktopView().subscribe(
      (res) => {
        this.isDesktop = res;
      }
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  onAdd() {
    this.router.navigate(['/private/users/users-form', 0]);
  }

}
