import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'StoreLoginSucc',
    templateUrl: './login_succ.component.html',
    styleUrls: ['assets/css/2.login_success.css']
})

export class LoginSuccComponent implements OnInit {
    num:number = 5;
    constructor( private router:Router) { }

    ngOnInit() { 
        this.loginSucc();
    }
    loginSucc() {
       var timer = setInterval(()=>{
            this.num--;
            this.num = this.num;
            if(this.num<=0){
                clearInterval(timer)
                this.router.navigateByUrl('/index');
            }
        },1000)
        console.log(this.num)
    }
}