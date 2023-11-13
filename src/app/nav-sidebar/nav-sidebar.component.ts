import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private _httpClientService: HttpclientService) {}

  ngOnInit(): void {
    this.menuList = this._httpClientService.getList<Menu>(
      `assets/data/menuList.json`
    );
  }
}
