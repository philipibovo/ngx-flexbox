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

@Directive({ inputs, selector })
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
      case widthSize >= 0 && widthSize <= 599:
        if (!this.pbfxWrap && !this.pbfxWrapXS) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapXS ? this.pbfxWrapXS : this.pbfxWrap;
        break;

      case widthSize >= 600 && widthSize <= 959:
        if (!this.pbfxWrap && !this.pbfxWrapSM) {
          return;
        }

        this.pbfxWrap = this.pbfxWrapSM ? this.pbfxWrapSM : this.pbfxWrap;
        break;

      case widthSize >= 960 && widthSize <= 1279:
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
    this._renderer2.setStyle(this._currentElement, `flex-wrap`, this.pbfxWrap);
  }
  // end setWrap(): void
}
