import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationService } from './core/services/navigation.service';
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';

type Resize = {
  isResizing: boolean;
  startingPoint: number;
  startingWidth: number;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // trigger('fadeInOut', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('350ms', style({ opacity: 1 })),
    //   ]),
    //   transition(':leave', [
    //     style({ opacity: 1 }),
    //     animate('350ms', style({ opacity: 0 })),
    //   ]),
    // ]),
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sideNav: MatSidenav;
  title = 'ui-testing';
  isLeftNavExpanded: boolean = true;
  screenWidth: number = 0;
  navigationMode: 'side' | 'over' = 'side';
  showCollapseButton: boolean = true;
  isLeftNavCollapsed: boolean = false;
  private defaultLeftSidenavWidth: number = 220;
  public resizingState: Resize = {
    isResizing: false,
    startingPoint: 0,
    startingWidth: 0,
  };

  constructor(
    private navigationService: NavigationService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('window:resize', ['$event']) evaluateNavModeBasedOnScreenwidth(
    event: MouseEvent
  ) {
    console.log(window.innerWidth);
    this.screenWidth = window.innerWidth;
    // this.navigationMode = this.screenWidth > 768 ? 'side' : 'over';
    if (this.screenWidth > 768) {
      this.navigationMode = 'side';
      // this.showCollapseButton = true;
    } else {
      this.navigationMode = 'over';
      // this.isExpanded = true;
      // this.showCollapseButton = false;
    }
  }

  @HostListener('window:mousemove', ['$event']) updateLeftNavWidth(
    event: MouseEvent
  ) {
    if (!this.resizingState.isResizing) {
      return;
    }
    // console.log('mouse moving');
    // 1. calculate how much mouse is moved
    const mouseMovedInXPos = event.clientX - this.resizingState.startingPoint;
    // 2. calculate new width of left sidenav
    const newLeftNavWidth = this.resizingState.startingWidth + mouseMovedInXPos;
    //set the new left nav width
    this.navigationService.setLeftNavigationWidth(newLeftNavWidth);
  }

  @HostListener('window:mouseup', ['$event']) resetResizingState(
    event: MouseEvent
  ) {
    this.resizingState.isResizing = false;
  }

  ngOnInit(): void {
    // console.log('init', window.innerWidth, this.navigationMode);
    this.document.body.classList.add('light-mode-theme');
  }
  // toggleNavExpand() {
  //   this.isLeftNavExpanded = !this.isLeftNavExpanded;
  // }
  toggleLeftNavBasedOnScreenSize() {
    this.sideNav.toggle();
  }

  startResizing(event: MouseEvent): void {
    console.log('mousedown', event.clientX);
    this.resizingState = {
      isResizing: true,
      startingPoint: event.clientX,
      startingWidth: this.navigationService.leftNavigationWidth,
    };
  }

  setLeftNavWidthToMiniNav(isMiniNav: boolean): void {
    this.isLeftNavCollapsed = isMiniNav;
    // this.isLeftNavCollapsed
    //   ? this.navigationService.setLeftNavigationWidth(65)
    //   : this.navigationService.setLeftNavigationWidth(
    //       this.defaultLeftSidenavWidth
    //     );
  }
}
