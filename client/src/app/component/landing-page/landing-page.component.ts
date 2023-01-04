import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  token: any = '';

  constructor(config: NgbCarouselConfig, private rt: Router, private authService: AuthService) {
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(res =>{
      this.token=res
    })

  }
  toAllFood() {
    this.rt.navigate(['product'])
  }

  // quickReg() {
  //   this.authService.getAuth().subscribe((res) => {
  //     this.token = res;
  //   })

  quickReg(){
    this.rt.navigateByUrl('signup')
  }
    
}
