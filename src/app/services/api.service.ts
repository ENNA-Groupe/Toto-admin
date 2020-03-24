import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AlertService } from './alert.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cloudSubject = new Subject<any>();

  constructor(
    private socket: Socket,
    private alert: AlertService
  ) {
    this.get('newData').subscribe(
      () => {
        console.log('new Data!');
        // socket.emit('cloud');
        // socket.on('cloud', (res: any[]) => {
        //   console.log(res);
        //   res.forEach(item => {
        //     this.cloudSubject.next(item);
        //   });
        // });
      }
    );
  }

  static emit(event, data) {
    let socket: Socket;
    return new Promise(
      (resolve, reject) => {
        socket.emit(event, data);
        socket.on(event,
          res => {
            resolve(res.data);
            if (res.infos) this.prototype.alert.toast(res.infos);
          })
      }
    );
  }

  post(event, data) {
    return new Promise(
      (resolve, reject) => {
        this.socket.emit(event, data);
        this.socket.on(event,
          res => {
            resolve(res.data);
            if (res.infos) this.alert.toast(res.infos);
          })
      }
    );
  }

  getStreamData(){
    return this.cloudSubject.asObservable();
  }

  get(event) {
    return this.socket
      .fromEvent(event);
  }
}
