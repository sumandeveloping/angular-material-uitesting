import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  changeTheme() {
    this.document.body.classList.remove('light-mode-theme');
    this.document.body.classList.add('dark-mode-theme');
  }
}
