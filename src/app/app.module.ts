import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app.router';
import { HttpService } from './utility/httpService/http.service';



import { AppComponent }  from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginSuccComponent } from './login_succ/login_succ.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './utility/header/header.component';
import { FooterComponent } from './utility/footer/footer.component';
import { PropBoxComponent } from './utility/propBox/prop_box.component';
import { IncrementComponent } from './utility/increment/increment.component';
import { BuyBtnComponent } from './utility/buyButton/buyBtn.component';
import { MaximPanelComponent } from './utility/maximPanel/maxim_panel.component';

@NgModule({
  providers:    [ HttpService ],
  imports:      [ BrowserModule, AppRoutingModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, IndexComponent, HeaderComponent, FooterComponent, 
                  LoginComponent, RegisterComponent, LoginSuccComponent, DetailComponent,
                  CartComponent, PropBoxComponent, MaximPanelComponent,IncrementComponent,
                  BuyBtnComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
