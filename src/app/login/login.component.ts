import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utility/httpService/http.service';

@Component({
    selector: 'StoreLogin',
    templateUrl: './login.component.html',
    styleUrls: ['assets/css/2.login.css']
})

export class LoginComponent implements OnInit {
    inputName:string = "";
    inputUpwd:string = "";
    valiUnameMsg:string;
    valiUpwdMsg:string;
    constructor(private http:HttpService,private router:Router) { }

    ngOnInit() { }

    // 验证用户名
    valiUname() {
        if(this.inputName==""){
            this.valiUnameMsg = "用户名不能为空";
        }else{
            this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/vali.php?uname='+this.inputName)
            .subscribe((result)=>{
                if(result.code>0){
                    this.valiUnameMsg = result.msg;
                }else{
                    this.valiUnameMsg = result.msg;
                }
            })
        }
    }
    valiUnames() {
        this.valiUnameMsg = "";
    }
    // 验证密码
    valiUpwd() {
        if(this.inputUpwd==""){
            this.valiUpwdMsg = "用户密码不能为空";
        }else{
            this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/vali_upwd.php?upwd='+this.inputUpwd+'&uname='+this.inputName)
            .subscribe((result)=>{
                if(result.code>0){
                    this.valiUpwdMsg = result.msg;
                }else{
                    this.valiUpwdMsg = result.msg;
                }
            })
        }  
    }
    valiUpwds(){
        this.valiUpwdMsg = "";
    }
    // 点击登录
    jumpLoginSucc() {
        if(this.inputName==""){
            this.valiUnameMsg = "用户名不能为空";
        }else{
            this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/login.php?uname='+this.inputName+'&upwd='+this.inputUpwd)
            .subscribe((result)=>{
                // console.log(result)
                if(result.code>0){
                    sessionStorage.setItem("uname",this.inputName);
                    sessionStorage.setItem("uid",result.uid);
                    this.router.navigateByUrl('/loginSucc');
                }
            })
        }
    }
}
