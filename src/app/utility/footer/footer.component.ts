import { Component, OnInit } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Component({
    selector: 'StoreFooter',
    templateUrl: './footer.component.html',
    styleUrls: ['assets/css/footer.css']
})

export class FooterComponent implements OnInit {
    //定义一个数组保存数据
    sliderList:any
    // 轮播
    num:number = 0;
    timer:any = "";
    left:number = 0;
    myLeft:string = '0px';
    myPosition:string = 'relative';
    myTransition:string = '';
    myWidth:string = '3600px';

    constructor(private http:HttpService) { }

    ngOnInit() { 
        //调用
        this.loadData();
        this.timer = setInterval(()=>{
            this.sliderBott();
        },2500)
    }
    loadData() {
        this.http.sendRequest('http://127.0.0.1/666-cake_angular/quickstart-master/src/data/bottom_slider.php')
            .subscribe((result:any)=>{
                //console.log(result)
                //将数据保存
                this.sliderList = result;
                this.sliderList.push(result[0]);
                this.sliderList.push(result[1]);
                this.sliderList.push(result[2]);
            })
    }
    // 轮播
    sliderBott() {
        this.num++; 
        if(this.num>5){
            this.num = 0;
            this.left = 0;
            this.myTransition = "none";
            this.myLeft = '0px';
        }
        setTimeout(()=>{
            this.myTransition = 'all 0.5s linear';
            this.left -= 400;
            this.myLeft=this.left+'px';
        },10)
    }
}