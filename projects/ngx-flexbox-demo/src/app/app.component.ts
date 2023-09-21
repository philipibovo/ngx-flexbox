import { Component, HostListener, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public installationCodePoints: string = `'''`;
  public installationCode001: string = `import { NgxFlexboxModule } from '@philipibovo/ngx-flexbox';`;
  public installationCode002: string = `@NgModule({`;
  public installationCode003: string = `imports: [ NgxFlexboxModule ],`;
  public installationCode004: string = `});`;
  public installationCode005: string = `<div pbFxLayout="row" pbFxLayoutAlign="start space-between"></div>`;

  public isScreenXS: boolean = false;
  public isScreenSM: boolean = false;
  public isScreenMD: boolean = false;
  public isScreenLG: boolean = false;
  public isScreenXL: boolean = false;

  public childrenAlignmentLayout: string = `row`;
  public childrenAlignmentLayoutAlign: string = `center space-around`;
  // Section Item Size
  public itemsSizeShowDirection: string = `row`;
  public itemsSizeItemSize1: number;
  public itemsSizeItemSize2: number;
  public itemsSizeItemSize3: number;
  public itemsSizeItemType1: string = `%`;
  public itemsSizeItemType2: string = `fill`;
  public itemsSizeItemType3: string = `px`;
  // Section Children Gap
  public childrenGapShowLayout: string = `row`;
  // Section Item Offset
  public itemsOffsetShowDirection: string = `row`;
  private _windowResizeEvent$: Subject<any> = new Subject<any>();

  constructor() {
    switch (true) {
      case window.innerWidth >= 0 && window.innerWidth <= 959:
        this.itemsSizeItemSize1 = 30;
        this.itemsSizeItemSize2 = 0;
        this.itemsSizeItemSize3 = 150;
        break;

      default:
        this.itemsSizeItemSize1 = 30;
        this.itemsSizeItemSize2 = 0;
        this.itemsSizeItemSize3 = 650;
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this._windowResizeEvent$.next(event);
  }

  ngOnInit(): void {
    this._windowResizeEvent$.pipe(debounceTime(100)).subscribe((event) => {
      this.changeScreenType();
    });

    this.changeScreenType();
  }

  changeScreenType(): void {
    switch (true) {
      case window.innerWidth >= 0 && window.innerWidth <= 599:
        this.isScreenXS = true;
        this.isScreenSM = false;
        this.isScreenMD = false;
        this.isScreenLG = false;
        this.isScreenXL = false;
        break;

      case window.innerWidth >= 600 && window.innerWidth <= 959:
        this.isScreenXS = false;
        this.isScreenSM = true;
        this.isScreenMD = false;
        this.isScreenLG = false;
        this.isScreenXL = false;
        break;

      case window.innerWidth >= 960 && window.innerWidth <= 1279:
        this.isScreenXS = false;
        this.isScreenSM = false;
        this.isScreenMD = true;
        this.isScreenLG = false;
        this.isScreenXL = false;
        break;

      case window.innerWidth >= 1280 && window.innerWidth <= 1919:
        this.isScreenXS = false;
        this.isScreenSM = false;
        this.isScreenMD = false;
        this.isScreenLG = true;
        this.isScreenXL = false;
        break;

      case window.innerWidth >= 1920:
        this.isScreenXS = false;
        this.isScreenSM = false;
        this.isScreenMD = false;
        this.isScreenLG = false;
        this.isScreenXL = true;
        break;
    }
  }

  changeLayoutAlignShow(first: string, second: string): void {
    this.childrenAlignmentLayoutAlign = `${first} ${second}`;
  }
  // end changeLayoutAlignShow(first: string, second: string): void

  changeItemsSizeShow(direction: string): void {
    this.itemsSizeShowDirection = direction;

    console.log(direction);

    let auxType1: string = this.itemsSizeItemType1;
    let auxType2: string = this.itemsSizeItemType2;
    let auxType3: string = this.itemsSizeItemType3;

    this.itemsSizeItemSize1++;
    this.itemsSizeItemSize2++;
    this.itemsSizeItemSize3++;
    this.itemsSizeItemType1 = ``;
    this.itemsSizeItemType2 = ``;
    this.itemsSizeItemType3 = ``;

    setTimeout(() => {
      if (this.itemsSizeShowDirection === `column`) {
        const parentSize: number = document.querySelector<HTMLElement>(
          `#itemSize .showcase.column`
        )!.clientHeight;

        switch (auxType1) {
          case `fill`:
            this.itemsSizeItemSize1 = 0;
            break;
          case `px`:
            this.itemsSizeItemSize1 = (parentSize / 100) * 30;
            break;
          case `%`:
            this.itemsSizeItemSize1 = 30;
            break;
        }

        switch (auxType2) {
          case `fill`:
            this.itemsSizeItemSize2 = 0;
            break;
          case `px`:
            this.itemsSizeItemSize2 = (parentSize / 100) * 20;
            break;
          case `%`:
            this.itemsSizeItemSize2 = 20;
            break;
        }

        switch (auxType3) {
          case `fill`:
            this.itemsSizeItemSize3 = 0;
            break;
          case `px`:
            this.itemsSizeItemSize3 = (parentSize / 100) * 50;
            break;
          case `%`:
            this.itemsSizeItemSize3 = 50;
            break;
        }
      }

      if (this.itemsSizeShowDirection === `row`) {
        const parentSize: number = document.querySelector<HTMLElement>(
          `#itemSize .showcase.row`
        )!.clientWidth;

        switch (auxType1) {
          case `fill`:
            this.itemsSizeItemSize1 = 0;
            break;
          case `px`:
            this.itemsSizeItemSize1 = (parentSize / 100) * 30;
            break;
          case `%`:
            this.itemsSizeItemSize1 = 30;
            break;
        }

        switch (auxType2) {
          case `fill`:
            this.itemsSizeItemSize2 = 0;
            break;
          case `px`:
            this.itemsSizeItemSize2 = (parentSize / 100) * 20;
            break;
          case `%`:
            this.itemsSizeItemSize2 = 20;
            break;
        }

        switch (auxType3) {
          case `fill`:
            this.itemsSizeItemSize3 = 0;
            break;
          case `px`:
            this.itemsSizeItemSize3 = (parentSize / 100) * 50;
            break;
          case `%`:
            this.itemsSizeItemSize3 = 50;
            break;
        }
      }

      this.itemsSizeItemType1 = auxType1;
      this.itemsSizeItemType2 = auxType2;
      this.itemsSizeItemType3 = auxType3;
    }, 10);
  }
  // end changeItemsSizeShow(direction: string): void
}
