import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
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
    this._currentElement = <HTMLElement>this._elementRef.nativeElement;
    this._isFill = false;

    const parentEl = this._currentElement.parentNode as HTMLElement;
    const parentFlexAlignItems: string = parentEl.style.alignItems;

    switch (true) {
      case widthSize >= 0 && widthSize <= 599:
        if (this.pbfxItemSize === null && this.pbfxItemSizeXS === null) {
          return;
        }

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeXS === `` ||
          this.pbfxItemSizeXS === `fill` ||
          parentFlexAlignItems === `stretch`
        ) {
          this._isFill = true;
        } else {
          this._directiveContent = this.pbfxItemSizeXS
            ? this.pbfxItemSizeXS
            : this.pbfxItemSize!;
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
          this.pbfxItemSizeSM === `fill` ||
          parentFlexAlignItems === `stretch`
        ) {
          this._isFill = true;
        } else {
          this._directiveContent = this.pbfxItemSizeSM
            ? this.pbfxItemSizeSM
            : this.pbfxItemSize!;
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
          this.pbfxItemSizeMD === `fill` ||
          parentFlexAlignItems === `stretch`
        ) {
          this._isFill = true;
        } else {
          this._directiveContent = this.pbfxItemSizeMD
            ? this.pbfxItemSizeMD
            : this.pbfxItemSize!;
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
          this.pbfxItemSizeLG === `fill` ||
          parentFlexAlignItems === `stretch`
        ) {
          this._isFill = true;
        } else {
          this._directiveContent = this.pbfxItemSizeLG
            ? this.pbfxItemSizeLG
            : this.pbfxItemSize!;
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
          this.pbfxItemSizeXL === `fill` ||
          parentFlexAlignItems === `stretch`
        ) {
          this._isFill = true;
        } else {
          this._directiveContent = this.pbfxItemSizeXL
            ? this.pbfxItemSizeXL
            : this.pbfxItemSize!;
        }
        break;
    }

    if (
      !this._isFill &&
      this._directiveContent.search(/calc/i) === -1 &&
      !this._directiveContent.match(
        /ch|cn|em|in|mm|pc|px|pt|rem|vh|vmax|vm|vmin|vw|x|%/g
      )
    ) {
      this._directiveContent += `%`;
    }

    this.setItemSize();
  }
  // end async setScreenType(widthSize: number)

  setItemSize(): void {
    const flags = RendererStyleFlags2.DashCase | RendererStyleFlags2.Important;
    const parentEl = this._currentElement.parentNode as HTMLElement;

    this._renderer2.removeStyle(this._currentElement, `flex`);
    this._renderer2.removeStyle(this._currentElement, `height`);
    this._renderer2.removeStyle(this._currentElement, `max-height`);
    this._renderer2.removeStyle(this._currentElement, `max-width`);
    this._renderer2.removeStyle(this._currentElement, `width`);

    if (this._isFill) {
      this._renderer2.setStyle(this._currentElement, `flex`, `1 auto`, flags);
    } else {
      let finalSize: string = this._directiveContent;

      // Calculate size minus sibiling's gap
      if (!this._directiveContent.match(/calc/g)) {
        if (parentEl.style.gap) {
          let gapSize = `${parentEl.style.gap.match(/\d+/g)}`;
          let gapUnit = `${parentEl.style.gap.match(
            /ch|cn|em|in|mm|pc|px|pt|rem|vh|vmax|vm|vmin|vw|x|%/g
          )}`;
          const totalSibilings: number = parentEl.childNodes.length;

          if (gapSize) {
            if (!gapUnit) {
              gapUnit = `%`;
            }

            parentEl.childNodes.forEach((sibling, i) => {
              if (i === 0 || i === totalSibilings - 1) {
                finalSize = `calc(${this._directiveContent} - ${
                  parseInt(gapSize) / 2
                }${gapUnit})`;
              } else {
                finalSize = `calc(${this._directiveContent} - ${gapSize}${gapUnit})`;
              }
            });
          }
        }
      }

      // Set Flex size
      this._renderer2.setStyle(
        this._currentElement,
        `flex`,
        `0 ${finalSize}`,
        flags
      );

      // Set max-size
      if (parentEl.style.alignItems !== `stretch`) {
        switch (parentEl.style.flexDirection) {
          case `column`:
            this._renderer2.setStyle(
              this._currentElement,
              `max-height`,
              finalSize,
              flags
            );
            break;

          case `row`:
            this._renderer2.setStyle(
              this._currentElement,
              `max-width`,
              finalSize,
              flags
            );
            break;
        }
      }
    }
  }
  // end setItemSize(): void
}
