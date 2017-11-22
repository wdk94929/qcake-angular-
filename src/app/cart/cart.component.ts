import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utility/httpService/http.service';

@Component({
    selector: 'StoreCart',
    templateUrl: './cart.component.html',
    styleUrls: ['assets/css/5.shoppingCart.css']
})

export class CartComponent implements OnInit {
    isShowDel:boolean = false;
    numCount:any = 1;
    isEmptyCart:boolean = true;
    productMsg:Array<any> = [];
    buyCount:Array<any> = [];
    totalPrice:Array<any> = [];
    allTotalPrice:number = 0;
    allTotalCount:number = 0;
    constructor(private http:HttpService,private router:Router) { }

    ngOnInit() { this.loadCartData()}
    loadCartData() {
        let uid = sessionStorage.getItem('uid');
        this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/addCartList.php?uid='+uid)
            .subscribe((result)=>{
                if(result.data==""){
                    this.isEmptyCart = true;
                }else{
                    this.isEmptyCart = false;
                    this.productMsg = result.msg;
                    console.log(this.productMsg );
                    for(var i=0;i<this.productMsg.length;i++){
                        this.buyCount.push(parseInt(this.productMsg[i].count));
                        this.totalPrice.push(this.productMsg[i].count*this.productMsg[i].price);
                    }
                    for(var j=0;j<this.totalPrice.length;j++){
                        this.allTotalPrice += this.totalPrice[j];
                    }
                    for(var k=0;k<this.buyCount.length;k++){
                        this.allTotalCount += this.buyCount[k];
                    }
                }
            })
    }
    // input框的验证
    confirmNum(myIndex:any) {
        var aReg = /^[1-9]\d{0,5}$/;
        if(aReg.test(this.buyCount[myIndex])){
        this.buyCount[myIndex] = this.buyCount[myIndex];
        this.totalPrice[myIndex] = this.buyCount[myIndex]*this.productMsg[myIndex].price;
        }else{
            this.buyCount[myIndex] = 1;
        }
        this.allTotalPrice=0;
        for(var j=0;j<this.totalPrice.length;j++){
            this.allTotalPrice += this.totalPrice[j];
        }
        this.allTotalCount = 0;
        for(var k=0;k<this.buyCount.length;k++){
            this.allTotalCount += this.buyCount[k];
        }

    }
    // 点击数量自增
    addRight(myIndex:any) { 
        var num = parseInt(this.buyCount[myIndex]);
        num++;
        this.buyCount[myIndex] = num;
        this.totalPrice[myIndex] = num*this.productMsg[myIndex].price;
        this.allTotalPrice += this.totalPrice[myIndex];
        this.allTotalCount += 1;
    }
    subLeft(myIndex:any) {
        var num = parseInt(this.buyCount[myIndex]);
        if(num>1){
        num--;
        this.buyCount[myIndex] = num;
        this.totalPrice[myIndex] = this.buyCount[myIndex]*this.productMsg[myIndex].price;
        this.allTotalPrice -= this.totalPrice[myIndex];
        this.allTotalCount -= 1;
        }else{
        this.buyCount[myIndex] = 1;
        }
    }
    // 删除商品
    isDel() {
        this.isShowDel = true;
    }
    quXiaoDel() {
        this.isShowDel = false;
    }
    delProduct(myIndex:any) {
        var sid = this.productMsg[myIndex].sid;
        this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/cartDel.php?sid='+sid)
            .subscribe((result)=>{
                // console.log(result)
                location.reload(true);
            })
    }
    // 全选
}