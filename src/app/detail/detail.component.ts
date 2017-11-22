import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utility/httpService/http.service';

@Component({
    selector: 'StoreDetail',
    templateUrl: './detail.component.html',
    styleUrls: ['assets/css/4.product_details.css']
})

export class DetailComponent implements OnInit {
    isShowModel:boolean = false;
    index: any;
    detailMsg: Array<any> = [];
    picMsg: Array<any> = [];

    addCartName:string = "加入购物车";
    rightNowName:string = "立即购买";
    numCount:any = 1;
    // 判断购物车模态框是否显示
    // isShowModel:boolean = false;
    isShowSuccModel:boolean = false;

    // 图片路径
    mdUrl:any = "";
    lgUrl:any = "";
    isShowLg:boolean = false;

    constructor(private http: HttpService,private router:Router) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.index = localStorage.getItem('index');
        this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/product_details_fu.php?index=' + this.index)
            .subscribe((result: any) => {
                //console.log(result);
                this.detailMsg = result.descData;
                this.picMsg = result.picData;
                this.mdUrl = this.picMsg[0].md;
                this.lgUrl = this.picMsg[0].lg;
            });
    }

    // 移入移出 value改变
    addCartEnter(){
      this.addCartName = "Ajuter au panier";
    }
    addCartLeave(){
      this.addCartName = "加入购物车";
    }
    rightNowEnter(){
      this.rightNowName = "Commander";
    }
    rightNowLeave(){
      this.rightNowName = "立即购买";
    }
    // 点击加入购物车跳到模态框
    addCartModelBox(myIndex: any) {
      this.isShowModel = true;
      localStorage.setItem('cid',myIndex+1)
    }
    closeClick() {
      this.isShowModel = false;
    }
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
    // 点击加入购物车
    addCart() {
      let cid = localStorage.getItem('cid');
      let uid = sessionStorage.getItem('uid');
      console.log(cid,uid)
      if(uid==null){
        this.router.navigateByUrl('/login');
      }else{
        this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/addCart.php?uid='+uid+'&index='+cid+'&buyCount='+this.numCount)
          .subscribe((result)=>{
            console.log(result);
            if(result.code==200){
              this.isShowModel = false;
              this.isShowSuccModel = true;
              setTimeout(()=>{
                this.isShowSuccModel = false;
              },2000)
            }
          })
      }
    }
    // 立即购买
    rightNowBuy() {
      let uname = sessionStorage.getItem('uname');
      let cid = localStorage.getItem('cid');
      let uid = sessionStorage.getItem('uid');
      if(uid==null){
        this.router.navigateByUrl('/login')
      }else{
        this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/addCart.php?uid='+uid+'&index='+cid+'&buyCount='+this.numCount)
        .subscribe((result)=>{
          //console.log(result);
          if(result.code==200){
            this.isShowModel = false;
            this.isShowSuccModel = true;
            setTimeout(()=>{
              this.isShowSuccModel = false;
              this.router.navigateByUrl('/cart');
            },2000)
          }
        })
      }

    }
    // 放大镜
    chooseImg(smIndex:any) {
      this.mdUrl = this.picMsg[smIndex].md;
      this.lgUrl = this.picMsg[smIndex].lg;
    }
    handleEnter() {
      this.isShowLg = true;
    }
    handleLeave() {
      this.isShowLg = false;
    }
    move($event:any) {
      console.log(1)
      var x = $event.pageX;
      var y = $event.pageY;
      console.log(x)
    }

}
