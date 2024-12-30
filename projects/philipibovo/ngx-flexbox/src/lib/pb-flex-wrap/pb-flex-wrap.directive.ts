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
  'pbFxWrap',
  'pbFxWrap.xs',
  'pbFxWrap.sm',
  'pbFxWrap.md',
  'pbFxWrap.lg',
  'pbFxWrap.xl',
];
const selector = `
  [pbFxWrap],
  [pbFxWrap.xs],
  [pbFxWrap.sm],
  [pbFxWrap.md],
  [pbFxWrap.lg],
  [pbFxWrap.xl],
`;

@Directive({ inputs, selector, standalone: false })
export class PbFlexWrapDirective {
  @Input(`pbFxWrap`) public pbfxWrap: string | null = null;
  @Input(`pbFxWrap.xs`) public pbfxWrapXS: string | null = null;
  @Input(`pbFxWrap.sm`) public pbfxWrapSM: string | null = null;
  @Input(`pbFxWrap.md`) public pbfxWrapMD: string | null = null;
  @Input(`pbFxWrap.lg`) public pbfxWrapLG: string | null = null;
  @Input(`pbFxWrap.xl`) public pbfxWrapXL: string | null = null;
  private _currentElement: any;
  private _wrap: number = 0;
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

  setScreenType(widthSize: number): void {
    this._currentElement = <HTMLFormElement>this._elementRef.nativeElement;

    switch (true) {
      case widthSize >= 0 && widthSize <= 767:
        if (!this.pbfxWrap && !this.pbfxWrapXS) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapXS ? this.pbfxWrapXS : this.pbfxWrap;
        break;

      case widthSize >= 768 && widthSize <= 1023:
        if (!this.pbfxWrap && !this.pbfxWrapSM) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapSM ? this.pbfxWrapSM : this.pbfxWrap;
        break;

      case widthSize >= 1024 && widthSize <= 1279:
        if (!this.pbfxWrap && !this.pbfxWrapMD) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapMD ? this.pbfxWrapMD : this.pbfxWrap;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        if (!this.pbfxWrap && !this.pbfxWrapLG) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapLG ? this.pbfxWrapLG : this.pbfxWrap;
        break;

      case widthSize >= 1920:
        if (!this.pbfxWrap && !this.pbfxWrapXL) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapXL ? this.pbfxWrapXL : this.pbfxWrap;
        break;
    }

    setTimeout(() => {
      this.setWrap();
    }, 0);
  }
  // end setScreenType(): void

  setWrap(): void {
    if (this._currentElement.getAttribute(`pbFxGap`)) {
      let gapSize = `${this._currentElement
        .getAttribute(`pbFxGap`)
        .match(/\d+/g)}`;
      let gapUnit = `${this._currentElement
        .getAttribute(`pbFxGap`)
        .match(/ch|cn|em|in|mm|pc|px|pt|rem|vh|vmax|vm|vmin|vw|x|%/g)}`;
      let parentFlexDirection: string =
        this._currentElement.style.flexDirection;
      const totalSibilings: number = this._currentElement.childNodes.length;

      // console.log(gapSize);
      // console.log(gapUnit);
      // console.log(parentFlexDirection);

      if (gapSize) {
        if (!gapUnit) {
          gapUnit = `%`;
        }

        this._currentElement.childNodes.forEach(
          (sibling: HTMLElement, i: number) => {
            let sibilingSize;

            if (parentFlexDirection === `column`) {
              if (i === 0 || i === totalSibilings - 1) {
                sibilingSize = `calc(${sibling.clientHeight} - ${
                  parseInt(gapSize) / 2
                }${gapUnit})`;
              } else {
                sibilingSize = `calc(${sibling.clientHeight} - ${gapSize}${gapUnit})`;
              }
            } else {
              if (i === 0 || i === totalSibilings - 1) {
                sibilingSize = `calc(${sibling.clientWidth} - ${
                  parseInt(gapSize) / 2
                }${gapUnit})`;
              } else {
                sibilingSize = `calc(${sibling.clientWidth} - ${gapSize}${gapUnit})`;
              }
            }
          }
        );
      }
    }

    this._renderer2.setStyle(this._currentElement, `flex-wrap`, this.pbfxWrap);
  }
  // end setWrap(): void
}
