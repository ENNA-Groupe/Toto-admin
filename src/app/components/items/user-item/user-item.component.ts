import { Component, OnInit, Input } from '@angular/core';
import { User, UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

  @Input("user") user: User;
  @Input("isDesktop") isDesktop: boolean;

  constructor(
    private router: Router,
  ) { 

  }

  ngOnInit() {}

  onShow() {
    this.router.navigate(['private/users/user-profil', this.user.get().id]);
  }

  onEdit() {
    this.router.navigate(['private/users/users-form', this.user.get().id]);
  }

  onDelete() {
    if (window.confirm("Voulez-vous supprimer cet utilisateur?")) this.user.destroy();
    
  }



}
