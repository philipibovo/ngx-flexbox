import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

const inputs = [
  'pbFxGap',
  'pbFxGap.xs',
  'pbFxGap.sm',
  'pbFxGap.md',
  'pbFxGap.lg',
  'pbFxGap.xl',
];
const selector = `
  [pbFxGap],
  [pbFxGap.xs],
  [pbFxGap.sm],
  [pbFxGap.md],
  [pbFxGap.lg],
  [pbFxGap.xl],
`;

@Directive({ inputs, selector })
export class PbFlexGapDirective implements OnChanges {
  @Input(`pbFxGap`) public pbfxChildrenGap: string | null = ``;
  @Input(`pbFxGap.xs`) public pbfxChildrenGapXS: string | null = ``;
  @Input(`pbFxGap.sm`) public pbfxChildrenGapSM: string | null = ``;
  @Input(`pbFxGap.md`) public pbfxChildrenGapMD: string | null = ``;
  @Input(`pbFxGap.lg`) public pbfxChildrenGapLG: string | null = ``;
  @Input(`pbFxGap.xl`) public pbfxChildrenGapXL: string | null = ``;
  private _currentElement: any;
  private _size: number = 0;
  private _unitType: string = ``;

  constructor(private _elementRef: ElementRef, private _renderer2: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => {
      this.setScreenType(event.currentTarget.innerWidth);
    }, 0);
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
        this.pbfxChildrenGap = this.pbfxChildrenGapXS
          ? this.pbfxChildrenGapXS
          : this.pbfxChildrenGap;
        break;

      case widthSize >= 600 && widthSize <= 959:
        this.pbfxChildrenGap = this.pbfxChildrenGapSM
          ? this.pbfxChildrenGapSM
          : this.pbfxChildrenGap;
        break;

      case widthSize >= 960 && widthSize <= 1279:
        this.pbfxChildrenGap = this.pbfxChildrenGapMD
          ? this.pbfxChildrenGapMD
          : this.pbfxChildrenGap;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        this.pbfxChildrenGap = this.pbfxChildrenGapLG
          ? this.pbfxChildrenGapLG
          : this.pbfxChildrenGap;
        break;

      case widthSize >= 1920:
        this.pbfxChildrenGap = this.pbfxChildrenGapXL
          ? this.pbfxChildrenGapXL
          : this.pbfxChildrenGap;
        break;
    }

    if (this.pbfxChildrenGap) {
      this._size = parseInt(this.pbfxChildrenGap.replace(/[^\d.-]+/g, ''));
      this._unitType = this.pbfxChildrenGap.search(/px/i) > 0 ? `px` : `%`;

      setTimeout(() => {
        this.setChildrenGap();
      }, 0);
    }
  }
  // end setScreenType(): void

  setChildrenGap(): void {
    this._renderer2.setStyle(
      this._currentElement,
      `gap`,
      `${this._size}${this._unitType}`
    );
  }
  // end setChildrenGap(): void
}
