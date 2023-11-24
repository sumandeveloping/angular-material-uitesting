import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  sidenavMinWidth: number = 98;
  sidenavMaxWidth: number = window.innerWidth / 2;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  get leftNavigationWidth(): number {
    const width = parseInt(
      getComputedStyle(this.document.body).getPropertyValue(
        '--leftNavigation-width'
      ),
      10
    );
    console.log('menu width: ', width);
    return width;
  }

  public setLeftNavigationWidth(width: number) {
    const finalWidth = Math.min(
      Math.max(width, this.sidenavMinWidth),
      this.sidenavMaxWidth
    );
    this.document.body.style.setProperty(
      '--leftNavigation-width',
      `${finalWidth}px`
    );
  }
}
