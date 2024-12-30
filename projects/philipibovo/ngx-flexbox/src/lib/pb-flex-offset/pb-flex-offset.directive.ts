import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

const inputs = [
  'pbFxOffset',
  'pbFxOffset.xs',
  'pbFxOffset.sm',
  'pbFxOffset.md',
  'pbFxOffset.lg',
  'pbFxOffset.xl',
];
const selector = `
  [pbFxOffset],
  [pbFxOffset.xs],
  [pbFxOffset.sm],
  [pbFxOffset.md],
  [pbFxOffset.lg],
  [pbFxOffset.xl],
`;

@Directive({ inputs, selector, standalone: false })
export class PbFlexOffsetDirective implements OnChanges {
  @Input(`pbFxOffset`) public pbfxItemOffset: string | null = ``;
  @Input(`pbFxOffset.xs`) public pbfxItemOffsetXS: string | null = ``;
  @Input(`pbFxOffset.sm`) public pbfxItemOffsetSM: string | null = ``;
  @Input(`pbFxOffset.md`) public pbfxItemOffsetMD: string | null = ``;
  @Input(`pbFxOffset.lg`) public pbfxItemOffsetLG: string | null = ``;
  @Input(`pbFxOffset.xl`) public pbfxItemOffsetXL: string | null = ``;
  private _currentElement: any;
  private _directiveContent: string = ``;

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
      case widthSize >= 0 && widthSize <= 767:
        if (!this.pbfxItemOffset && !this.pbfxItemOffsetXS) {
          return;
        }

        this._directiveContent = this.pbfxItemOffsetXS
          ? this.pbfxItemOffsetXS
          : this.pbfxItemOffset!;
        break;

      case widthSize >= 768 && widthSize <= 1023:
        if (!this.pbfxItemOffset && !this.pbfxItemOffsetSM) {
          return;
        }

        this._directiveContent = this.pbfxItemOffsetSM
          ? this.pbfxItemOffsetSM
          : this.pbfxItemOffset!;
        break;

      case widthSize >= 1024 && widthSize <= 1279:
        if (!this.pbfxItemOffset && !this.pbfxItemOffsetMD) {
          return;
        }

        this._directiveContent = this.pbfxItemOffsetMD
          ? this.pbfxItemOffsetMD
          : this.pbfxItemOffset!;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        if (!this.pbfxItemOffset && !this.pbfxItemOffsetLG) {
          return;
        }

        this._directiveContent = this.pbfxItemOffsetLG
          ? this.pbfxItemOffsetLG
          : this.pbfxItemOffset!;
        break;

      case widthSize >= 1920:
        if (!this.pbfxItemOffset && !this.pbfxItemOffsetXL) {
          return;
        }

        this._directiveContent = this.pbfxItemOffsetXL
          ? this.pbfxItemOffsetXL
          : this.pbfxItemOffset!;
        break;
    }

    if (
      this._directiveContent.search(/calc/i) === -1 &&
      !this._directiveContent.match(
        /ch|cn|em|in|mm|pc|px|pt|rem|vh|vmax|vm|vmin|vw|x|%/g
      )
    ) {
      this._directiveContent += `%`;
    }

    this.setItemOffset();
  }
  // end setScreenType(): void

  setItemOffset(): void {
    const flags = RendererStyleFlags2.DashCase | RendererStyleFlags2.Important;
    const parentDirection: string = window.getComputedStyle(
      this._currentElement.parentNode
    ).flexDirection
      ? window.getComputedStyle(this._currentElement.parentNode).flexDirection
      : `row`;

    if (parentDirection === `column`) {
      this._renderer2.removeStyle(this._currentElement, `margin-top`);

      this._renderer2.setStyle(
        this._currentElement,
        `margin-top`,
        this._directiveContent,
        flags
      );
    } else {
      this._renderer2.removeStyle(this._currentElement, `margin-left`);

      this._renderer2.setStyle(
        this._currentElement,
        `margin-left`,
        this._directiveContent,
        flags
      );
    }
  }
  // end setItemOffset(): void
}
