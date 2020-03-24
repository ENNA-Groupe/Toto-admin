import { Component, OnInit } from '@angular/core';
import { Control } from 'src/app/models/control.model';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.page.html',
  styleUrls: ['./controls.page.scss'],
})
export class ControlsPage implements OnInit {

  controlSubscription: Subscription;
  controls: Control[];
  controlTrashSubscription: Subscription;
  controlsTrash: Control[];
  trash:boolean = false;
  searchValue = "";
  
  constructor(
    private popoverController: PopoverController,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
   this.controlSubscription =  this.dataService.getControls().subscribe(
      (res: Control[]) => {
       this.controls = res;
      }
    );
    
  //  this.controlTrashSubscription =  this.paramsService.getControlsTrash().subscribe(
  //     (res: Control[]) => {
  //      this.controlsTrash = res;
  //     }
  //   );
  }

  ngOnDestroy(){
   this.controlSubscription.unsubscribe();
  //  this.controlTrashSubscription.unsubscribe();
  }

  // async onAdd() {
  //   const popover = await this.popoverController.create({
  //     component: ControlFormComponent,
  //     translucent: false
  //   });
  
  //   popover.onDidDismiss().then(
  //     (res) => {
  //       console.log(res.data);
  //       if (res.data) this.paramsService.addControl(res.data);
  //     }
  //   )
  //   await popover.present();
  // }

  // async onEdit(id) {
  //   const popover = await this.popoverController.create({
  //     component: ControlFormComponent,
  //     translucent: false,
  //     componentProps: {
  //       id: id
  //     }
  //   });
  
  //   popover.onDidDismiss().then(
  //     (res) => {
  //       if (res.data) this.paramsService.editControl(res.data);
  //     }
  //   )
  //   await popover.present();
  // }

  // async onShow(id) {
  //   const popover = await this.popoverController.create({
  //     component: ControlProfilComponent,
  //     translucent: false,
  //     componentProps: {
  //       id: id,
  //       trash: this.trash
  //     }
  //   });
  //   await popover.present();
  // }
  
  // onDelete(id: number){
  //   this.paramsService.deleteControl(id);
  // }

  // onRestore(id: number){
  //   this.paramsService.restoreControl(id);
  // }

}