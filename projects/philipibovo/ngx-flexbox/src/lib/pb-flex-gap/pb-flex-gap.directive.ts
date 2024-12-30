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

@Directive({ inputs, selector, standalone: false })
export class PbFlexGapDirective implements OnChanges {
  @Input(`pbFxGap`) public pbfxChildrenGap: string | null = ``;
  @Input(`pbFxGap.xs`) public pbfxChildrenGapXS: string | null = ``;
  @Input(`pbFxGap.sm`) public pbfxChildrenGapSM: string | null = ``;
  @Input(`pbFxGap.md`) public pbfxChildrenGapMD: string | null = ``;
  @Input(`pbFxGap.lg`) public pbfxChildrenGapLG: string | null = ``;
  @Input(`pbFxGap.xl`) public pbfxChildrenGapXL: string | null = ``;
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
        if (!this.pbfxChildrenGap && !this.pbfxChildrenGapXS) {
          return;
        }

        this._directiveContent = this.pbfxChildrenGapXS
          ? this.pbfxChildrenGapXS
          : this.pbfxChildrenGap!;
        break;

      case widthSize >= 768 && widthSize <= 1023:
        if (!this.pbfxChildrenGap && !this.pbfxChildrenGapSM) {
          return;
        }

        this._directiveContent = this.pbfxChildrenGapSM
          ? this.pbfxChildrenGapSM
          : this.pbfxChildrenGap!;
        break;

      case widthSize >= 1024 && widthSize <= 1279:
        if (!this.pbfxChildrenGap && !this.pbfxChildrenGapMD) {
          return;
        }

        this._directiveContent = this.pbfxChildrenGapMD
          ? this.pbfxChildrenGapMD
          : this.pbfxChildrenGap!;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        if (!this.pbfxChildrenGap && !this.pbfxChildrenGapLG) {
          return;
        }

        this._directiveContent = this.pbfxChildrenGapLG
          ? this.pbfxChildrenGapLG
          : this.pbfxChildrenGap!;
        break;

      case widthSize >= 1920:
        if (!this.pbfxChildrenGap && !this.pbfxChildrenGapXL) {
          return;
        }

        this._directiveContent = this.pbfxChildrenGapXL
          ? this.pbfxChildrenGapXL
          : this.pbfxChildrenGap!;
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

    this.setChildrenGap();
  }
  // end setScreenType(): void

  setChildrenGap(): void {
    const flags = RendererStyleFlags2.DashCase | RendererStyleFlags2.Important;
    this._renderer2.removeStyle(this._currentElement, `gap`);

    this._renderer2.setStyle(
      this._currentElement,
      `gap`,
      this._directiveContent,
      flags
    );
  }
  // end setChildrenGap(): void
}
