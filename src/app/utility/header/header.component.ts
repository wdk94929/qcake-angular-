import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';

@Component({
  selector: 'StoreHeader',
  templateUrl: './header.component.html',
  styleUrls: [ 'assets/css/header.css' ]
})

export class HeaderComponent implements OnInit {
  off:boolean = true;
  uname:any = "";
  uid:any = "";
  buyTotalCount:number = 0;
  isShowWelcome:boolean = true;

  headerList: Array<any> = [
    {freName:'Nos Produits',cheName:'全部产品'},
    {freName:'Napoléon',cheName:'拿破仑'},
    {freName:'Nouveauté',cheName:'最新活动'},
    {freName:`Mon M'CAKE`,cheName:'会员中心'}
  ];
  isShow:Array<any>=[1,0,0,0];

  citiesList:Array<any> = [
    {isShow:true,city:'上海市'},
    {isShow:false,city:'杭州市'},
    {isShow:false,city:'苏州市'},
    {isShow:false,city:'北京市'}
  ];
  
  constructor(private router: Router,private http:HttpService) { }

  ngOnInit() { 
    this.welcome();
    this.loadDataCount();
  }
  loadDataCount(){
    this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/totalCount.php?uid='+this.uid)
      .subscribe((result)=>{
        // console.log(result)
        for(var i=0;i<result.length;i++){
          this.buyTotalCount += parseInt(result[i].count);
        }
        // console.log(this.buyTotalCount)
      })
  }
  // 显示欢迎登陆
  welcome() {
    this.uname = sessionStorage.getItem('uname');
    this.uid = sessionStorage.getItem('uid');
    if(this.uid){
      this.isShowWelcome = false;
    }else{
      this.isShowWelcome = true;
    }
  }
  // 退出登录
  loginOut() {
    sessionStorage.removeItem("uname");
    sessionStorage.removeItem("uid");
    this.isShowWelcome = true;
    this.buyTotalCount = 0;
  }

  jumpToIndex() {
    this.router.navigateByUrl('/index');
  }
  //选择城市
  selectCity(){
    if(this.off){
      for(var i=0;i<this.citiesList.length;i++){
        this.citiesList[i].isShow = true;
        this.off = false;
      }
    }else{
      for(var i=0;i<this.citiesList.length;i++){
        this.citiesList[i].isShow = false;
        this.off = true;
      }
      this.citiesList[0].isShow = true;
    }
  }
  handleClick(index:any) {
    for(var i=0;i<this.citiesList.length;i++){
        this.citiesList[i].isShow = false;
        this.off = true;
      }
    this.citiesList[index].isShow = true;
  }

  handleover(hoverIndex:any) {
    this.isShow.splice(0,1,0);
    this.isShow.splice(hoverIndex,1,1);
    //this.isShow[hoverIndex]=1;
    
  }
  handleout(hoverIndex:any) {
    // this.myBorderBottom = '3px solid transparent';
    // this.isShow = true;
    this.isShow.splice(hoverIndex,1,0);
    this.isShow.splice(0,1,1);
  }
}
