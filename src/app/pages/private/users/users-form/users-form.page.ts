import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonSlides, PopoverController } from '@ionic/angular';
import { NgxPicaService, NgxPicaErrorInterface } from 'ngx-pica';
import { User, UsersData } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.page.html',
  styleUrls: ['./users-form.page.scss'],
})
export class UsersFormPage implements OnInit {

  
  form: FormGroup;
  title: string = "Ajout d'utilisateur";
  photo: string;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  slideIndex: number = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  item = new User();
  constructor(
    private popoverController: PopoverController,
    private users: UsersData,
    private route: ActivatedRoute,
    private router: Router,
    private ngxPicaService: NgxPicaService,
  ) {

  }

  ngOnInit() {
    let id = + this.route.snapshot.params['id'];
    if (id) {
      this.item = this.users.getById(id);
      this.title = this.item.get().nom;
      this.photo = this.item.get().photo;
    }
    else {
      this.photo = './assets/img/user.png';
    }
    this.initForm();
  }

  ngOnDestroy() {
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      this.ngxPicaService.resizeImages([file], 200, 200)
      .subscribe((imageResized: File) => {          
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(imageResized);
      }, (err: NgxPicaErrorInterface) => {
          throw err.err;
      });
      // const reader = new FileReader();

      // reader.onload = this.handleReaderLoaded.bind(this);
      // reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.photo = 'data:image/png;base64,' + btoa(e.target.result);
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(this.item.get().id),
      nom: new FormControl(this.item.get().nom, Validators.required),
      prenom: new FormControl(this.item.get().prenom),
      salaire: new FormControl(this.item.get().salaire),
      contact1: new FormControl(this.item.get().contact1, [Validators.required, Validators.minLength(8)]),
      contact2: new FormControl(this.item.get().contact2, [Validators.required, Validators.minLength(8)]),
      identifiant: new FormControl(this.item.get().identifiant, [Validators.required, Validators.minLength(2)]),
    });
  }

  get nom() { return this.form.get('nom'); };
  get prenom() { return this.form.get('prenom'); };
  get contact1() { return this.form.get('contact1'); };
  get contact2() { return this.form.get('contact2'); };
  get identifiant() { return this.form.get('identifiant'); };

  
  onSubmit() {
    this.form.value.nom = this.form.value.nom.toUpperCase();
    this.form.value.photo = this.photo;
    if (!this.item.get().id) this.item = new User (this.form.value);
    else this.item.set(this.form.value);
    this.router.navigate(['/private/users']);
  }

  onClose(data) {
    this.popoverController.dismiss(data);
  }
}
