import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidenavMenu } from './components/shared/sidebar/sidebar-menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings, Settings } from './components/shared/services/color-option.service';
import { AuthService } from './components/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public url : any;

  public sidenavMenuItems:Array<any>;

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  title = 'ecommerce-sophia-new';
  scrollElem;
  public settings: Settings;
  constructor(private authService:AuthService, private spinner: NgxSpinnerService, public router: Router, public appSettings:AppSettings) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
      window.scrollTo(0, 0)
    } );

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
           document.body.scrollTop = 0; // scroll top to body element
      }
  });

  this.settings = this.appSettings.settings;
  }
  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    })  
  }

  navItems: SidenavMenu[] = [
    {
      displayName: 'Home',
      iconName: 'recent_actors',
      route: '/home'
    },
    {
      displayName: 'Products',
          iconName: 'feedback',
          route: '/home/products/all'
    }
  ];

  get isLoggedIn():boolean
  {
    return this.authService.isLoggedIn();
  }

  get user():any
  {
    let data = this.authService.getUser();
    return data;
  }

  get role():string
  {
    let data = this.authService.getUser();
    return data.role;
  }


  ngOnInit() {

    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.scrollElem = document.querySelector('#moveTop');
    // this.scrollElem.scrollIntoView();
  }



  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
}


}
