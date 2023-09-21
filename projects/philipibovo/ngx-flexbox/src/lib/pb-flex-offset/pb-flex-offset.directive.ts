import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
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

@Directive({ inputs, selector })
export class PbFlexOffsetDirective implements OnChanges {
  @Input(`pbFxOffset`) public pbfxItemOffset: string | null = ``;
  @Input(`pbFxOffset.xs`) public pbfxItemOffsetXS: string | null = ``;
  @Input(`pbFxOffset.sm`) public pbfxItemOffsetSM: string | null = ``;
  @Input(`pbFxOffset.md`) public pbfxItemOffsetMD: string | null = ``;
  @Input(`pbFxOffset.lg`) public pbfxItemOffsetLG: string | null = ``;
  @Input(`pbFxOffset.xl`) public pbfxItemOffsetXL: string | null = ``;
  private _currentElement: any;
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
        this.pbfxItemOffset = this.pbfxItemOffsetXS
          ? this.pbfxItemOffsetXS
          : this.pbfxItemOffset;
        break;

      case widthSize >= 600 && widthSize <= 959:
        this.pbfxItemOffset = this.pbfxItemOffsetSM
          ? this.pbfxItemOffsetSM
          : this.pbfxItemOffset;
        break;

      case widthSize >= 960 && widthSize <= 1279:
        this.pbfxItemOffset = this.pbfxItemOffsetMD
          ? this.pbfxItemOffsetMD
          : this.pbfxItemOffset;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        this.pbfxItemOffset = this.pbfxItemOffsetLG
          ? this.pbfxItemOffsetLG
          : this.pbfxItemOffset;
        break;

      case widthSize >= 1920:
        this.pbfxItemOffset = this.pbfxItemOffsetXL
          ? this.pbfxItemOffsetXL
          : this.pbfxItemOffset;
        break;
    }

    if (this.pbfxItemOffset) {
      this._unitType = this.pbfxItemOffset.search(/px/i) > 0 ? `px` : `%`;
      this.pbfxItemOffset = this.pbfxItemOffset.replace(/[^\d.-]+/g, '');

      this.setItemOffset();
    }
  }
  // end setScreenType(): void

  setItemOffset(): void {
    const parentDirection: string = window.getComputedStyle(
      this._currentElement.parentNode
    ).flexDirection;
    let currentItemNewSize: number = 0;
    let parentTotalSize: number = 0;

    if (parentDirection === `column`) {
      parentTotalSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).height
      );

      setTimeout(() => {
        currentItemNewSize =
          parseInt(
            window
              .getComputedStyle(this._currentElement)
              .height.replace(/[^\d.-]+/g, '')
          ) + parseInt(this.pbfxItemOffset!);
      }, 0);

      this._renderer2.setStyle(
        this._currentElement,
        `margin-top`,
        `${this.pbfxItemOffset}${this._unitType}`
      );

      setTimeout(() => {
        this._renderer2.setStyle(
          this._currentElement,
          `min-height`,
          `${currentItemNewSize}px`
        );
      }, 1);

      // Adjust size sibilings %
      setTimeout(() => {
        this._currentElement.parentNode.childNodes.forEach((child: any) => {
          for (let i = 0; i < child.attributes.length; i++) {
            if (
              child.attributes[i].nodeName.search(`pbfx-item-size`) >= 0 &&
              child.attributes[i].nodeValue.search(/%/i) > 0
            ) {
              this._renderer2.setStyle(
                child,
                `min-height`,
                `${
                  (parentTotalSize / 100) *
                  parseInt(
                    child.attributes[i].nodeValue.replace(/[^0-9\\.]+/g, '')
                  )
                }px`
              );
            }
          }
        });
      }, 1);

      // Adjust size sibilings fill
      setTimeout(() => {
        let isFillSize: boolean = false;
        let marginsTotalSize: number = 0;
        let qtdParentChildrenFill: number = 0;
        let siblingsNoFillTotalSize: number = 0;
        this._currentElement.parentNode.childNodes.forEach((child: any) => {
          isFillSize = false;

          for (let i = 0; i < child.attributes.length; i++) {
            if (
              child.attributes[i].nodeName.search(`pbfx-item-size`) >= 0 &&
              (child.attributes[i].nodeValue === `fill` ||
                child.attributes[i].nodeValue === ``)
            ) {
              isFillSize = true;

              marginsTotalSize =
                marginsTotalSize +
                parseInt(
                  window
                    .getComputedStyle(child)
                    .marginBottom.replace(/[^0-9\\.]+/g, '')
                ) +
                parseInt(
                  window
                    .getComputedStyle(child)
                    .marginTop.replace(/[^0-9\\.]+/g, '')
                );
            }
          }

          if (!isFillSize) {
            siblingsNoFillTotalSize =
              siblingsNoFillTotalSize +
              parseInt(
                window.getComputedStyle(child).height.replace(/[^0-9\\.]+/g, '')
              );

            marginsTotalSize =
              marginsTotalSize +
              parseInt(
                window
                  .getComputedStyle(child)
                  .marginBottom.replace(/[^0-9\\.]+/g, '')
              ) +
              parseInt(
                window
                  .getComputedStyle(child)
                  .marginTop.replace(/[^0-9\\.]+/g, '')
              );
          } else {
            qtdParentChildrenFill++;
          }
        });

        this._currentElement.parentNode.childNodes.forEach((child: any) => {
          for (let i = 0; i < child.attributes.length; i++) {
            if (
              child.attributes[i].nodeName.search(`pbfx-item-size`) >= 0 &&
              (child.attributes[i].nodeValue === `fill` ||
                child.attributes[i].nodeValue === ``)
            ) {
              this._renderer2.setStyle(
                child,
                `min-height`,
                `${
                  (parentTotalSize -
                    (siblingsNoFillTotalSize + marginsTotalSize)) /
                  qtdParentChildrenFill
                }px`
              );

              // this._renderer2.setStyle(child, `min-height`, `10px`);
            }
          }
        });
      }, 1);
    }

    if (parentDirection === `row`) {
      parentTotalSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).width
      );

      setTimeout(() => {
        currentItemNewSize =
          parseInt(
            window
              .getComputedStyle(this._currentElement)
              .width.replace(/[^\d.-]+/g, '')
          ) + parseInt(this.pbfxItemOffset!);
      }, 0);

      this._renderer2.setStyle(
        this._currentElement,
        `margin-left`,
        `${this.pbfxItemOffset}${this._unitType}`
      );

      setTimeout(() => {
        this._renderer2.setStyle(
          this._currentElement,
          `min-width`,
          `${currentItemNewSize}px`
        );
      }, 1);

      // Adjust size sibilings %
      this._currentElement.parentNode.childNodes.forEach((child: any) => {
        for (let i = 0; i < child.attributes.length; i++) {
          if (
            child.attributes[i].nodeName.search(`pbfx-item-size`) >= 0 &&
            child.attributes[i].nodeValue.search(/%/i) > 0
          ) {
            setTimeout(() => {
              this._renderer2.setStyle(
                child,
                `min-width`,
                `${child.attributes[i].nodeValue}`
              );
            }, 1);
          }
        }
      });

      // Adjust size sibilings fill
      setTimeout(() => {
        let isFillSize: boolean = false;
        let marginsTotalSize: number = 0;
        let qtdParentChildrenFill: number = 0;
        let siblingsNoFillTotalSize: number = 0;
        this._currentElement.parentNode.childNodes.forEach((child: any) => {
          isFillSize = false;

          for (let i = 0; i < child.attributes.length; i++) {
            if (
              child.attributes[i].nodeName.search(`pbfx-item-size`) >= 0 &&
              (child.attributes[i].nodeValue === `fill` ||
                child.attributes[i].nodeValue === ``)
            ) {
              isFillSize = true;

              marginsTotalSize =
                marginsTotalSize +
                parseInt(
                  window
                    .getComputedStyle(child)
                    .marginLeft.replace(/[^0-9\\.]+/g, '')
                ) +
                parseInt(
                  window
                    .getComputedStyle(child)
                    .marginRight.replace(/[^0-9\\.]+/g, '')
                );
            }
          }

          if (!isFillSize) {
            siblingsNoFillTotalSize =
              siblingsNoFillTotalSize +
              parseInt(
                window.getComputedStyle(child).width.replace(/[^0-9\\.]+/g, '')
              );

            marginsTotalSize =
              marginsTotalSize +
              parseInt(
                window
                  .getComputedStyle(child)
                  .marginLeft.replace(/[^0-9\\.]+/g, '')
              ) +
              parseInt(
                window
                  .getComputedStyle(child)
                  .marginRight.replace(/[^0-9\\.]+/g, '')
              );
          } else {
            qtdParentChildrenFill++;
          }
        });

        this._currentElement.parentNode.childNodes.forEach((child: any) => {
          for (let i = 0; i < child.attributes.length; i++) {
            if (
              child.attributes[i].nodeName.search(`pbfx-item-size`) >= 0 &&
              (child.attributes[i].nodeValue === `fill` ||
                child.attributes[i].nodeValue === ``)
            ) {
              this._renderer2.setStyle(
                child,
                `min-width`,
                `${
                  (parentTotalSize -
                    (siblingsNoFillTotalSize + marginsTotalSize)) /
                  qtdParentChildrenFill
                }px`
              );
            }
          }
        });
      }, 1);
    }
  }
  // end setItemOffset(): void
}
