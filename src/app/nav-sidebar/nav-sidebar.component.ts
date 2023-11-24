import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '../core/interfaces/menu.interface';
import { Observable } from 'rxjs';
import { HttpclientService } from '../core/services/httpclient.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
})
export class NavSidebarComponent implements OnInit {
  menuList: Observable<Menu[]>;
  dashboardMenuList: any = {
    hasHeader: false,
    button: false,
    items: [
      {
        text: 'Dashboard',
        icon: 'people_alt',
        routerLink: '/dashboard',
      },
    ],
  };
  salesMenuList: any = {
    hasHeader: true,
    header: 'Sales',
    button: true,
    btnConfig: {
      label: 'Upload List',
      icon: 'file_upload',
      type: 'button',
      routerLink: '/reports',
    },
    items: [
      {
        text: 'Lead',
        icon: 'send',
        routerLink: '/reports',
      },
      {
        text: 'Account',
        icon: 'account_box',
        routerLink: '/reports',
      },
      {
        text: 'Opportunity',
        icon: 'monetization_on',
        routerLink: '/reports',
      },
      {
        text: 'Upload List',
        icon: 'file_upload',
        routerLink: '/reports',
      },
    ],
  };
  coMarketingMenuList: any = {
    hasHeader: true,
    header: 'Marketing',
    button: false,
    items: [
      {
        text: 'Audience',
        icon: 'people_alt',
        routerLink: '/',
      },
      {
        text: 'Campaign',
        icon: 'campaign',
        routerLink: '/reports',
        items: [
          {
            text: 'Outgoing Campaign',
            icon: 'outgoing_mail',
            routerLink: '/reports',
          },
          {
            text: 'Manage Campaign',
            icon: 'settings',
            routerLink: '/reports',
          },
        ],
      },
      {
        text: 'Templates',
        icon: 'code',
        routerLink: '/reports',
      },
      {
        text: 'Components',
        icon: 'widgets',
        routerLink: '/reports',
        items: [
          {
            text: 'Asset',
            icon: 'outgoing_mail',
            routerLink: '/reports',
          },
          {
            text: 'Landing Page',
            icon: 'settings',
            routerLink: '/reports',
          },
          {
            text: 'Microsite',
            icon: 'settings',
            routerLink: '/reports',
          },
          {
            text: 'Form Builder',
            icon: 'settings',
            routerLink: '/reports',
          },
        ],
      },
    ],
  };
  reportsMenuList: any = {
    hasHeader: true,
    header: 'Reports',
    button: false,
    items: [
      {
        text: 'Dashboard',
        icon: 'people_alt',
        routerLink: '/',
      },
      {
        text: 'Reports',
        icon: 'campaign',
        routerLink: '/reports',
        items: [
          {
            text: 'Sales',
            icon: 'outgoing_mail',
            routerLink: '/reports',
          },
          {
            text: 'Marketing',
            icon: 'settings',
            routerLink: '/reports',
          },
        ],
      },
    ],
  };
  toggleMiniNav: boolean = false;
  @Input() mode: string = 'side';
  @Output() showMiniNav: EventEmitter<boolean> = new EventEmitter();
  @Output() toggleLeftSideNav: EventEmitter<any> = new EventEmitter();

  constructor(private _httpClientService: HttpclientService) {}

  ngOnInit(): void {
    this.menuList = this._httpClientService.getList<Menu>(
      `assets/data/menuList.json`
    );
  }

  onToggleMiniNav() {
    if (this.mode == 'side') {
      this.toggleMiniNav = !this.toggleMiniNav;
      this.showMiniNav.emit(this.toggleMiniNav);
    } else {
      this.toggleLeftSideNav.emit();
    }
  }
}
