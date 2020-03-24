import { ApiService } from '../services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface UserModel {
    id: number;
    nom: string;
    prenom: string;
    contact1: string;
    contact2: string;
    photo: string;
    identifiant: string;
    salaire: number;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    isOffline: string;

}

export class User {
    private api = new ApiService();
    private data: UsersData;
    constructor(
        private user?: UserModel,
    ) {
        if (user) {
            if (!user.id) {
                console.log(user);
                this.api.post('employe:add', user).then(
                    (res: UserModel) => {
                        user = res
                        this.data.add(this.user);
                    }
                );
            }
        } else {
            this.user = { id: null, nom: '', prenom: '', contact1: '', contact2: '', photo: '', identifiant: '', salaire: null, password: '', createdAt: '', updatedAt: '', deletedAt: '', isOffline: '' }
        }
    }

    get() {
        return this.user;
    }

    set(user: UserModel) {
        this.api.post('employe:edit', { oldData: this.user, newData: user }).then(
            (res: UserModel) => {
                this.user = res;
                this.data.edit(this.user);
            }
        );
    }

    destroy() {
        this.api.post('employe:delete', this.user).then(
            (res: UserModel) => {
                this.user = res;
                this.data.delete(this.user);
            }
        );
    }

    restore() {
        this.api.post('user:restore', this.user).then(
            (res: UserModel) => {
                this.user = res;
                this.data.delete(this.user);
            }
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class UsersData {

    private users: User[] = [];
    private usersTrash: UserModel[] = [];

    usersSubject = new BehaviorSubject(this.users);
    usersTrashSubject = new BehaviorSubject(this.usersTrash);


    getAll(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    getAllTrash(): Observable<UserModel[]> {
        return this.usersTrashSubject.asObservable();
    }

    getById(id: number): User {
        return this.users.find(item => item.get().id === id)
    }

    add(item: UserModel): void {
        let user = new User(item);
        this.users.push(user);
        this.usersSubject.next(this.users);
    }

    edit(item: UserModel): void {
        let user = new User(item);
        let i = this.users.findIndex(elem => elem.get().id === item.id);
        this.users[i] = user;
        this.usersSubject.next(this.users);
    }

    delete(item: UserModel): void {
        let i = this.users.findIndex(elem => elem.get().id === item.id);
        this.users.splice(i, 1);
        this.usersTrash.push(item);
        this.usersTrashSubject.next(this.usersTrash);
        this.usersSubject.next(this.users);
    }


}

