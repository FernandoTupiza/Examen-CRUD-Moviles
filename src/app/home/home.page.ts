import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Contact } from '../models/contact';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { NewContactPage } from '../nueva-actividad/new-contact.page';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contacts: Observable<Contact[]>;

  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router:Router   
  ) {
    this.contacts = this.dataService.getContacts();
  }

  logOut(){
    this.dataService.salir()
    .then(()=>{this.router.navigate(['/login'])
    })
    .catch(error=>console.log(error))
  }

  async openNewContactModal() {
    const modal = await this.modalController.create({
      component: NewContactPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
