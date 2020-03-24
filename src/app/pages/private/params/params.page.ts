import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.page.html',
  styleUrls: ['./params.page.scss'],
})
export class ParamsPage implements OnInit, OnDestroy {
  private isDesktop;
  sub: Subscription;
  constructor(
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.data.isDesktopView().subscribe(
      res => {
        this.isDesktop = res;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  segmentChanged(e){
    console.log(e.target.value);
    this.router.navigate(['private/params/'+e.target.value]);
  }
  
}
