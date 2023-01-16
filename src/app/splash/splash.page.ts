import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router) {
    setTimeout(()=>{
      this.router.navigateByUrl('login');
    },3000);
   }

  ngOnInit() {
  }

}
