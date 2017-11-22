import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'StoreIncrement',
    templateUrl: './increment.component.html',
    styleUrls:['assets/css/1-index.css']
})

export class IncrementComponent implements OnInit {
    numCount:any = 1;
    constructor() { }

    ngOnInit() { }
    // input框的验证
  confirmNum() {
    console.log(this.numCount)
    var aReg = /^[1-9]\d{0,5}$/;
    if(aReg.test(this.numCount)){
      this.numCount = this.numCount;
    }else{
      this.numCount = 1;
    }
  }
  // 点击数量自增
  addRight() { 
    var num = parseInt(this.numCount);
    num++;
    this.numCount = num;
    console.log(this.numCount)
  }
  subLeft() {
    var num = parseInt(this.numCount);
    if(num>1){
      num--;
      this.numCount = num;
    }else{
      this.numCount = 1;
    }
  }
}