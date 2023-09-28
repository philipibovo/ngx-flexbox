import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

const inputs = [
  'pbFxSize',
  'pbFxSize.xs',
  'pbFxSize.sm',
  'pbFxSize.md',
  'pbFxSize.lg',
  'pbFxSize.xl',
];

const selector = `
  [pbFxSize],
  [pbFxSize.xs],
  [pbFxSize.sm],
  [pbFxSize.md],
  [pbFxSize.lg],
  [pbFxSize.xl],
`;

@Directive({ inputs, selector })
export class PbFlexSizeDirective implements OnChanges, OnInit {
  @Input(`pbFxSize`) public pbfxItemSize: string | null = null;
  @Input(`pbFxSize.xs`) public pbfxItemSizeXS: string | null = null;
  @Input(`pbFxSize.sm`) public pbfxItemSizeSM: string | null = null;
  @Input(`pbFxSize.md`) public pbfxItemSizeMD: string | null = null;
  @Input(`pbFxSize.lg`) public pbfxItemSizeLG: string | null = null;
  @Input(`pbFxSize.xl`) public pbfxItemSizeXL: string | null = null;
  private _currentElement: any;
  private _isFill: boolean = false;
  private _directiveContent: string = ``;
  private _size: number = 0;
  private _unitType: string = ``;
  private _windowResizeEvent$: Subject<any> = new Subject<any>();

  constructor(private _elementRef: ElementRef, private _renderer2: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this._windowResizeEvent$.next(event);
  }

  ngOnInit(): void {
    this._windowResizeEvent$.pipe(debounceTime(100)).subscribe((event) => {
      this.setScreenType(window.innerWidth);
    });
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.setScreenType(window.innerWidth);
    }, 0);
  }
  // end ngOnChanges(): void

  setScreenType(widthSize: number) {
    this._currentElement = <HTMLFormElement>this._elementRef.nativeElement;
    this._isFill = false;

    switch (true) {
      case widthSize >= 0 && widthSize <= 599:
        if (this.pbfxItemSize === null && this.pbfxItemSizeXS === null) {
          return;
        }

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeXS === `` ||
          this.pbfxItemSizeXS === `fill`
        ) {
          this._isFill = true;
        } else {
          if (this.pbfxItemSizeXS) {
            if (this.pbfxItemSizeXS.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSizeXS;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSizeXS.search(/px/i) >= 0 ? `px` : `%`;
            }
          } else {
            if (this.pbfxItemSize!.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSize!;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSize!.search(/px/i) >= 0 ? `px` : `%`;
            }
          }

          if (this._unitType !== `calc`) {
            this._size = this.pbfxItemSizeXS
              ? parseInt(this.pbfxItemSizeXS!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));
          }
        }
        break;

      case widthSize >= 600 && widthSize <= 959:
        if (this.pbfxItemSize === null && this.pbfxItemSizeSM === null) {
          return;
        }

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeSM === `` ||
          this.pbfxItemSizeSM === `fill`
        ) {
          this._isFill = true;
        } else {
          if (this.pbfxItemSizeSM) {
            if (this.pbfxItemSizeSM.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSizeSM;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSizeSM.search(/px/i) >= 0 ? `px` : `%`;
            }
          } else {
            if (this.pbfxItemSize!.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSize!;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSize!.search(/px/i) >= 0 ? `px` : `%`;
            }
          }

          if (this._unitType !== `calc`) {
            this._size = this.pbfxItemSizeSM
              ? parseInt(this.pbfxItemSizeSM!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));
          }
        }
        break;

      case widthSize >= 960 && widthSize <= 1279:
        if (this.pbfxItemSize === null && this.pbfxItemSizeMD === null) {
          return;
        }

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeMD === `` ||
          this.pbfxItemSizeMD === `fill`
        ) {
          this._isFill = true;
        } else {
          if (this.pbfxItemSizeMD) {
            if (this.pbfxItemSizeMD.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSizeMD;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSizeMD.search(/px/i) >= 0 ? `px` : `%`;
            }
          } else {
            if (this.pbfxItemSize!.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSize!;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSize!.search(/px/i) >= 0 ? `px` : `%`;
            }
          }

          if (this._unitType !== `calc`) {
            this._size = this.pbfxItemSizeMD
              ? parseInt(this.pbfxItemSizeMD!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));
          }
        }
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        if (this.pbfxItemSize === null && this.pbfxItemSizeLG === null) {
          return;
        }

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeLG === `` ||
          this.pbfxItemSizeLG === `fill`
        ) {
          this._isFill = true;
        } else {
          if (this.pbfxItemSizeLG) {
            if (this.pbfxItemSizeLG.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSizeLG;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSizeLG.search(/px/i) >= 0 ? `px` : `%`;
            }
          } else {
            if (this.pbfxItemSize!.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSize!;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSize!.search(/px/i) >= 0 ? `px` : `%`;
            }
          }

          if (this._unitType !== `calc`) {
            this._size = this.pbfxItemSizeLG
              ? parseInt(this.pbfxItemSizeLG!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));
          }
        }
        break;

      case widthSize >= 1920:
        if (this.pbfxItemSize === null && this.pbfxItemSizeXL === null) {
          return;
        }

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeXL === `` ||
          this.pbfxItemSizeXL === `fill`
        ) {
          this._isFill = true;
        } else {
          if (this.pbfxItemSizeXL) {
            if (this.pbfxItemSizeXL.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSizeXL;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSizeXL.search(/px/i) >= 0 ? `px` : `%`;
            }
          } else {
            if (this.pbfxItemSize!.search(/calc/i) >= 0) {
              this._directiveContent = this.pbfxItemSize!;
              this._unitType = `calc`;
            } else {
              this._unitType =
                this.pbfxItemSize!.search(/px/i) >= 0 ? `px` : `%`;
            }
          }

          if (this._unitType !== `calc`) {
            this._size = this.pbfxItemSizeXL
              ? parseInt(this.pbfxItemSizeXL!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));
          }
        }
        break;
    }

    this.setItemSize();
  }
  // end async setScreenType(widthSize: number)

  setItemSize(): void {
    this._renderer2.removeStyle(this._currentElement, `flex`);

    if (this._isFill) {
      this._renderer2.setStyle(this._currentElement, `flex`, `1 auto`);
    } else {
      let finalCssValue: string = ``;

      if (this._unitType === `calc`) {
        finalCssValue = `0 ${this._directiveContent}`;
      } else {
        finalCssValue = `0 ${this._size}${this._unitType}`;
      }

      this._renderer2.setStyle(this._currentElement, `flex`, finalCssValue);
    }
  }
  // end setItemSize(): void
}
