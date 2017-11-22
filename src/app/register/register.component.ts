import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utility/httpService/http.service';

@Component({
    selector: 'StoreRegister',
    templateUrl: './register.component.html',
    styleUrls: ['assets/css/03.register.css']
})

export class RegisterComponent implements OnInit {
    inputUname:string = "";
    inputUpwd:string = "";
    confirmUpwd:string = "";
    inputPhone:string = "";
    valiUnameMsg:string = "";
    valiUpwdMsg:string = "";
    confirmUpwdMsg:string = "";
    valiPhoneMsg:string = "";
    unameIsTrue:boolean = false;
    upwdIsTrue:boolean = false;
    phoneIsTrue:boolean = false;
    confirmPwdIsTrue:boolean = false;
    checkBox:boolean = false;
    constructor(private router:Router,private http:HttpService) { }

    ngOnInit() { }
    // 用户名
    valiUname() {
        var unameReg=/^[a-zA-z0-9]{3,10}$/;
        if(this.inputUname==""){
            this.valiUnameMsg = "用户名不能为空";
        }else if(!unameReg.test(this.inputUname)){
            this.valiUnameMsg = "用户名必须是3-10位的数字或字母";
        }else{
            this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/vali.php?uname='+this.inputUname)
                .subscribe((result)=>{
                    //console.log(result)
                    if(result.code>0){
                        this.valiUnameMsg = "用户名已存在";
                    }else{
                        this.valiUnameMsg = "通过";
                        this.unameIsTrue = true;
                    }
                })
        }
    }
    valiUnames() {
        this.valiUnameMsg = "";
    }
    // 用户号码
    valiPhone() {
        var phoneReg=/^(\+86|0086)?\s*1[34578]\d{9}$/;
        if(phoneReg.test(this.inputPhone)){
            this.valiPhoneMsg = "通过";
            this.phoneIsTrue = true;
        }else{
            this.valiPhoneMsg = "请输入正确格式的手机号";
        }
    }
    valiPhones() {
        this.valiPhoneMsg = "";
    }
    // 用户密码
    valiUpwd() {
        var upwdReg=/^[a-zA-z0-9]{6,15}$/;
        if(upwdReg.test(this.inputUpwd)){
            this.valiUpwdMsg = "通过";
            this.upwdIsTrue = true;
        }else{
            this.valiUpwdMsg = "密码必须是6~30位字符，可使用字母、数字";
        }
    }
    valiUpwds() {
        this.valiUpwdMsg = "";
    }
    // 密码确认
    valiConfirmUpwd() {
        if(this.confirmUpwd==""){
            this.confirmUpwdMsg = "";
        }else if(this.confirmUpwd==this.inputUpwd){
            this.confirmUpwdMsg = "通过";
            this.confirmPwdIsTrue = true;
        }else{
            this.confirmUpwdMsg = "两次输入的密码必须一致";
        }
    }
    valiConfirmUpwds() {
        this.confirmUpwdMsg = "";
    }
    // 同意协议
    isAgree() {
        console.log(this.checkBox)
    }
    // 提交按钮
    register() {
        if(this.unameIsTrue&&this.upwdIsTrue&&this.phoneIsTrue&&this.confirmPwdIsTrue){
            console.log(1)
            if(this.checkBox){
                this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/register.php?uname='+this.inputUname+'&upwd='+this.inputUpwd+'&phone='+this.inputPhone)
                    .subscribe((result)=>{
                        if(result.code>0){
                            this.router.navigateByUrl('/login');
                        }
                    })
            }
        }
    }
    
}