import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
// import { ChatService } from '../../services/chat.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private dataService: DataService
    
    // private chatService: ChatService
  ) { 

    this.credentialForm=new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  async onSubmit(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dataService.register(this.credentialForm.value)
    .then(async(response)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registro con Exito',
        message: "Inicia sesion con tus credenciales",
        buttons: ['OK'],
      });
      await alert.present();
    })
    .catch(async(error)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registro Fallido',
        message: "Error al registrarse",
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  async ingresar(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dataService.login(this.credentialForm.value)
    .then(response=>{
      loading.dismiss();
      console.log(response);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    })
    .catch(async(error)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Inicio Fallido',
        message: "Error en la autenticación",
        buttons: ['OK'],
      });
      await alert.present();
    });
  }


  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Easy access for form fields
  get email() {
    return this.credentialForm.get('email');
  }
  
  get password() {
    return this.credentialForm.get('password');
  }

}
