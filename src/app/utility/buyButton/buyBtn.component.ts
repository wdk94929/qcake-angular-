import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import {Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'StoreBuyBtn',
    templateUrl: './buyBtn.component.html',
    styleUrls:['assets/css/1-index.css']
})

export class BuyBtnComponent implements OnInit {
    
    constructor(private router:Router,private http:HttpService) { }

    ngOnInit() { }
    
}