import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utility/httpService/http.service';

@Component({
  selector: 'storeIndex',
  templateUrl: './index.component.html',
  styleUrls: ['assets/css/1-index.css']
})

export class IndexComponent implements OnInit {
  numCount:any = 1;
  addCartName:string = "加入购物车";
  rightNowName:string = "立即购买";
  ListCake: Array<any> = [];
  ListRefreshments: Array<any> = [];
  cid:Array<any> = [];
  /*记录甜度的长度*/
  sweetLength: Array<any> = [];
  sweetLengthBot: Array<any> = [];

  rightPartList: Array<any> = [
    {isShowBg: false, name: '全部蛋糕'},
    {isShowBg: false, name: '拿破仑'},
    {isShowBg: false, name: '鲜奶'},
    {isShowBg: false, name: '慕斯'},
    {isShowBg: false, name: '芝士'},
    {isShowBg: false, name: '巧克力'},
    {isShowBg: false, name: '咖啡'},
    {isShowBg: false, name: '坚果'},
    {isShowBg: false, name: '水果'},
    {isShowBg: false, name: '冰激凌'}
  ];
  cake: any = 'cake';
  refreshments: any = 'refreshments';
  // 轮播
  divNum: number = 0;
  left: number = 0;
  m: number = 0;
  myLeft: string="0px";
  timer: any;
  sliderLength: number = 5;
  myTransition: string="all .5s linear";
  // 圆点
  navCirList: Array<any> = ['li', 'li', 'li', 'li'];
  cirIsShow: Array<any> = [1, 0, 0, 0];
  // 判断购物车模态框是否显示
  isShowModel:boolean = false;
  isShowSuccModel:boolean = false;
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.recMsg();
    this.timer = setInterval(()=>{
        this.banner();
        this.cirRemove();
    },3000)
  }
  recMsg() {
    this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/index_product.php')
      .subscribe((result: any) => {
        //遍历将数据分开
        //console.log(result)
        for( var i = 0;i<result.length;i++){
          if(result[i].category==this.cake){
            this.ListCake.push(result[i]);
            var num=this.ListCake[i].sweetness_index;
            // 在sweetLength数组中添加一个数组
            // 循环遍历往二维数组中添加一个1，记录其长度
            this.sweetLength.push([])
            for(var j=0;j<num;j++){
                this.sweetLength[i].push(1);
            }
          }else if(result[i].category==this.refreshments){
            this.ListRefreshments.push(result[i]);
          }
        }
        // console.log(this.ListRefreshments)
        //console.log(this.sweetLength)
        for(var i = 0;i<this.ListRefreshments.length;i++){
          var num=this.ListRefreshments[i].sweetness_index;
          this.cid.push(this.ListRefreshments[i].cid);
            this.sweetLengthBot.push([]);
            for(var j=0;j<num;j++){
                this.sweetLengthBot[i].push(1);
            }
        }
      })
  }
  handleEnter(cakeIndex: number) {
    this.rightPartList[cakeIndex].isShowBg = true;
  }
  handleOut(cakeIndex: number) {
    this.rightPartList[cakeIndex].isShowBg = false;
  }
  // 轮播
  banner(){
    this.divNum++;
    if(this.divNum==this.sliderLength){
      this.divNum=1;
      this.left=0;
      this.myTransition="none";
      this.myLeft=this.left+'px';
    }
    setTimeout(()=>{
      this.left-=1350;
      this.myTransition="all .5s linear";
      this.myLeft=this.left+'px';
    },10)
  }
  //移入暂停
  enterPause() {
    clearInterval(this.timer);
    this.timer = null;
  }
  outGoOn() {
    this.divNum = this.divNum;
    this.timer = setInterval(()=>{
      this.banner();
      this.cirRemove();
    },3000)
  }
  // 左侧按钮
  runRight() {
    clearInterval(this.timer)
    if(this.divNum>0){
      this.divNum--;
      this.left+=1350;
      this.myTransition="all .5s linear";
      this.myLeft=this.left+'px';
      // console.log(this.divNum)
    }else {
      this.myTransition="none";
      this.divNum = this.sliderLength-1;
      this.left = -1350*this.divNum;
      this.myLeft=this.left+'px';
      this.divNum--;
      setTimeout(()=>{
        this.myTransition="all .5s linear";
        this.left = -1350*this.divNum;
        this.myLeft=this.left+'px';
        // this.myTransition="none";
      },20)
    }
    if(this.m>0){
      this.m--;
      this.cirIsShow[this.m] = 1;
      this.cirIsShow[this.m+1] = 0;
    }else{
      this.cirIsShow[this.m] = 0;
      this.m=3;
      this.cirIsShow[this.m] = 1;
    }
  }
  // 右侧按钮
  runLeft() {
    clearInterval(this.timer)
    this.banner();
    this.cirRemove();
  }
  // 小圆点移动
  cirRemove() {
    this.m++;
    this.cirIsShow[this.m] = 1;
    this.cirIsShow[this.m-1] = 0;
    if(this.m>3){
      this.cirIsShow[this.m] = 0;
      this.m=0;
      this.cirIsShow[this.m] = 1;
      this.cirIsShow[this.m-1] = 0;
    }
  }
  // 圆点点击事件
  handleClickShow(cirIndex:number) {
    for(var i=0;i<this.cirIsShow.length;i++){
      this.cirIsShow[i] = 0;
    }
    this.cirIsShow[cirIndex] = 1;
    //让圆点和的下标 和点击时的下标对应上
    this.m = cirIndex;
    clearInterval(this.timer);
    this.divNum = cirIndex;
    this.left = -1350*this.divNum;
    this.myLeft = this.left+'px';
    this.myTransition="all .5s linear";
  }
  jumpToDetail(myIndex: any) {
    this.router.navigateByUrl('/detail');
    localStorage.setItem('index', myIndex+1)
  }
  jumpToDetailBot(myIndexBot:any) {
    this.router.navigateByUrl('/detail');
    localStorage.setItem('index',this.cid[myIndexBot])
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
}
