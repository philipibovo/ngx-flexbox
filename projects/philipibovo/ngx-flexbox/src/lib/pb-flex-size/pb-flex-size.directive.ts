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
  private _isXS: boolean = false;
  private _isSM: boolean = false;
  private _isMD: boolean = false;
  private _isLG: boolean = false;
  private _isXL: boolean = false;
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

  async setScreenType(widthSize: number) {
    this._currentElement = <HTMLFormElement>this._elementRef.nativeElement;

    switch (true) {
      case widthSize >= 0 && widthSize <= 599:
        if (this.pbfxItemSize === null && this.pbfxItemSizeXS === null) {
          return;
        }

        this._isXS = true;

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeXS === `` ||
          this.pbfxItemSizeXS === `fill`
        ) {
          setTimeout(() => {
            this.calcFillSize();
          }, 0);
        } else {
          if (this.pbfxItemSizeXS) {
            this._unitType = this.pbfxItemSizeXS.search(/px/i) > 0 ? `px` : `%`;
          } else {
            this._unitType = this.pbfxItemSize!.search(/px/i) > 0 ? `px` : `%`;
          }

          if (this._unitType === `%`) {
            this.calcPercentSize(
              this.pbfxItemSizeXS
                ? parseInt(this.pbfxItemSizeXS!.replace(/[^\d.-]+/g, ''))
                : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''))
            );
          } else {
            this._size = this.pbfxItemSizeXS
              ? parseInt(this.pbfxItemSizeXS!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));

            this.setItemSize();
          }
        }
        break;

      case widthSize >= 600 && widthSize <= 959:
        if (this.pbfxItemSize === null && this.pbfxItemSizeSM === null) {
          return;
        }

        this._isSM = true;

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeSM === `` ||
          this.pbfxItemSizeSM === `fill`
        ) {
          setTimeout(() => {
            this.calcFillSize();
          }, 0);
        } else {
          if (this.pbfxItemSizeSM) {
            this._unitType = this.pbfxItemSizeSM.search(/px/i) > 0 ? `px` : `%`;
          } else {
            this._unitType = this.pbfxItemSize!.search(/px/i) > 0 ? `px` : `%`;
          }

          if (this._unitType === `%`) {
            this.calcPercentSize(
              this.pbfxItemSizeSM
                ? parseInt(this.pbfxItemSizeSM!.replace(/[^\d.-]+/g, ''))
                : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''))
            );
          } else {
            this._size = this.pbfxItemSizeSM
              ? parseInt(this.pbfxItemSizeSM!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));

            this.setItemSize();
          }
        }
        break;

      case widthSize >= 960 && widthSize <= 1279:
        if (this.pbfxItemSize === null && this.pbfxItemSizeMD === null) {
          return;
        }

        this._isMD = true;

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeMD === `` ||
          this.pbfxItemSizeMD === `fill`
        ) {
          setTimeout(() => {
            this.calcFillSize();
          }, 0);
        } else {
          if (this.pbfxItemSizeMD) {
            this._unitType = this.pbfxItemSizeMD.search(/px/i) > 0 ? `px` : `%`;
          } else {
            this._unitType = this.pbfxItemSize!.search(/px/i) > 0 ? `px` : `%`;
          }

          if (this._unitType === `%`) {
            this.calcPercentSize(
              this.pbfxItemSizeMD
                ? parseInt(this.pbfxItemSizeMD!.replace(/[^\d.-]+/g, ''))
                : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''))
            );
          } else {
            this._size = this.pbfxItemSizeMD
              ? parseInt(this.pbfxItemSizeMD!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));

            this.setItemSize();
          }
        }
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        if (this.pbfxItemSize === null && this.pbfxItemSizeLG === null) {
          return;
        }

        this._isLG = true;

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeLG === `` ||
          this.pbfxItemSizeLG === `fill`
        ) {
          setTimeout(() => {
            this.calcFillSize();
          }, 0);
        } else {
          if (this.pbfxItemSizeLG) {
            this._unitType = this.pbfxItemSizeLG.search(/px/i) > 0 ? `px` : `%`;
          } else {
            this._unitType = this.pbfxItemSize!.search(/px/i) > 0 ? `px` : `%`;
          }

          if (this._unitType === `%`) {
            this.calcPercentSize(
              this.pbfxItemSizeLG
                ? parseInt(this.pbfxItemSizeLG!.replace(/[^\d.-]+/g, ''))
                : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''))
            );
          } else {
            this._size = this.pbfxItemSizeLG
              ? parseInt(this.pbfxItemSizeLG!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));

            this.setItemSize();
          }
        }
        break;

      case widthSize >= 1920:
        if (this.pbfxItemSize === null && this.pbfxItemSizeXL === null) {
          return;
        }

        this._isXL = true;

        if (
          this.pbfxItemSize === `` ||
          this.pbfxItemSize === `fill` ||
          this.pbfxItemSizeXL === `` ||
          this.pbfxItemSizeXL === `fill`
        ) {
          setTimeout(() => {
            this.calcFillSize();
          }, 0);
        } else {
          if (this.pbfxItemSizeXL) {
            this._unitType = this.pbfxItemSizeXL.search(/px/i) > 0 ? `px` : `%`;
          } else {
            this._unitType = this.pbfxItemSize!.search(/px/i) > 0 ? `px` : `%`;
          }

          if (this._unitType === `%`) {
            this.calcPercentSize(
              this.pbfxItemSizeXL
                ? parseInt(this.pbfxItemSizeXL!.replace(/[^\d.-]+/g, ''))
                : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''))
            );
          } else {
            this._size = this.pbfxItemSizeXL
              ? parseInt(this.pbfxItemSizeXL!.replace(/[^\d.-]+/g, ''))
              : parseInt(this.pbfxItemSize!.replace(/[^\d.-]+/g, ''));

            this.setItemSize();
          }
        }
        break;
    }
  }
  // end async setScreenType(widthSize: number)

  calcFillSize(): void {
    const parentDirection = window.getComputedStyle(
      this._currentElement.parentNode
    ).flexDirection;
    let parentAttributes: any[] = [];
    let parentTotalSize: number = 0;
    let marginsTotalSize: number = 0;
    let qtdParentChildrenFillSize: number = 0;
    let siblingsNoFillTotalSize: number = 0;
    let validParentChildren: any[] = [];

    for (
      let i = 0;
      i < this._currentElement.parentNode.attributes.length;
      i++
    ) {
      parentAttributes.push(
        JSON.parse(
          `{ "${this._currentElement.parentNode.attributes[i].nodeName}": "${this._currentElement.parentNode.attributes[i].nodeValue}" }`
        )
      );
    }

    if (parentDirection === `column`) {
      parentTotalSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).height
      );
    }

    if (parentDirection === `row`) {
      parentTotalSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).width
      );
    }

    for (let i = 0; i < this._currentElement.parentNode.children.length; i++) {
      if (this._currentElement.parentNode.childNodes[i].tagName) {
        validParentChildren.push(this._currentElement.parentNode.childNodes[i]);
      }
    }

    validParentChildren.forEach((child: any) => {
      let sibilingAttributes: any[] = [];
      let sibilingSize: number = 0;
      let sibilingUnit: string = ``;

      for (let i = 0; i < child.attributes.length; i++) {
        sibilingAttributes.push(
          JSON.parse(
            `{ "${child.attributes[i].nodeName}": "${child.attributes[i].nodeValue}" }`
          )
        );
      }

      // Calculate size
      if (
        sibilingAttributes.filter((c) =>
          Object.keys(c).some((k) => k.includes(`pbfx-item-size`))
        )[0]
      ) {
        // Enter here if sibiling has pbFxSize

        let isFill: boolean = false;

        if (
          sibilingAttributes.filter((c) =>
            Object.keys(c).some((k) =>
              k.includes(
                `pbfx-item-size${
                  this._isXS
                    ? '-x-s'
                    : this._isSM
                    ? '-s-m'
                    : this._isMD
                    ? '-m-d'
                    : this._isLG
                    ? '-l-g'
                    : this._isXL
                    ? '-x-l'
                    : ''
                }`
              )
            )
          )[0]
        ) {
          if (
            Object.values(
              sibilingAttributes.filter((c) =>
                Object.keys(c).some((k) =>
                  k.includes(
                    `pbfx-item-size${
                      this._isXS
                        ? '-x-s'
                        : this._isSM
                        ? '-s-m'
                        : this._isMD
                        ? '-m-d'
                        : this._isLG
                        ? '-l-g'
                        : this._isXL
                        ? '-x-l'
                        : ''
                    }`
                  )
                )
              )[0]
            )[0] === `` ||
            Object.values(
              sibilingAttributes.filter((c) =>
                Object.keys(c).some((k) =>
                  k.includes(
                    `pbfx-item-size${
                      this._isXS
                        ? '-x-s'
                        : this._isSM
                        ? '-s-m'
                        : this._isMD
                        ? '-m-d'
                        : this._isLG
                        ? '-l-g'
                        : this._isXL
                        ? '-x-l'
                        : ''
                    }`
                  )
                )
              )[0]
            )[0] === `fill`
          ) {
            isFill = true;
          }
        } else {
          if (
            Object.values(
              sibilingAttributes.filter((c) =>
                Object.keys(c).some((k) => k.includes(`pbfx-item-size`))
              )[0]
            )[0] === `` ||
            Object.values(
              sibilingAttributes.filter((c) =>
                Object.keys(c).some((k) => k.includes(`pbfx-item-size`))
              )[0]
            )[0] === `fill`
          ) {
            isFill = true;
          }
        }

        if (isFill) {
          qtdParentChildrenFillSize++;

          // Subtract margins values to size
          let parentGapSize: number = 0;
          let parentGapUnit: string = ``;

          if (
            sibilingAttributes.filter((c) =>
              Object.keys(c).some((k) =>
                k.includes(
                  `pbfx-children-gap${
                    this._isXS
                      ? '-x-s'
                      : this._isSM
                      ? '-s-m'
                      : this._isMD
                      ? '-m-d'
                      : this._isLG
                      ? '-l-g'
                      : this._isXL
                      ? '-x-l'
                      : ''
                  }`
                )
              )
            )[0]
          ) {
            parentGapSize = parseInt(
              Object.values<string>(
                parentAttributes.filter((c) =>
                  Object.keys(c).some((k) =>
                    k.includes(
                      `pbfx-children-gap${
                        this._isXS
                          ? '-x-s'
                          : this._isSM
                          ? '-s-m'
                          : this._isMD
                          ? '-m-d'
                          : this._isLG
                          ? '-l-g'
                          : this._isXL
                          ? '-x-l'
                          : ''
                      }`
                    )
                  )
                )[0]
              )[0].replace(/[^0-9\\.]+/g, '')
            );

            parentGapUnit =
              Object.values<string>(
                parentAttributes.filter((c) =>
                  Object.keys(c).some((k) =>
                    k.includes(
                      `pbfx-children-gap${
                        this._isXS
                          ? '-x-s'
                          : this._isSM
                          ? '-s-m'
                          : this._isMD
                          ? '-m-d'
                          : this._isLG
                          ? '-l-g'
                          : this._isXL
                          ? '-x-l'
                          : ''
                      }`
                    )
                  )
                )[0]
              )[0].search(/px/i) > 0
                ? `px`
                : `%`;

            if (parentGapUnit === `px`) {
              marginsTotalSize +=
                (parentGapSize *
                  (this._currentElement.parentNode.children.length - 1)) /
                this._currentElement.parentNode.children.length;
            } else {
              marginsTotalSize =
                (parentTotalSize / 100) *
                (parentGapSize *
                  (this._currentElement.parentNode.children.length - 1));
            }
          } else if (
            parentAttributes.filter((c) =>
              Object.keys(c).some((k) => k.includes(`pbfx-children-gap`))
            )[0]
          ) {
            parentGapSize = parseInt(
              Object.values<string>(
                parentAttributes.filter((c) =>
                  Object.keys(c).some((k) => k.includes(`pbfx-children-gap`))
                )[0]
              )[0].replace(/[^0-9\\.]+/g, '')
            );

            parentGapUnit =
              Object.values<string>(
                parentAttributes.filter((c) =>
                  Object.keys(c).some((k) => k.includes(`pbfx-children-gap`))
                )[0]
              )[0].search(/px/i) > 0
                ? `px`
                : `%`;

            if (parentGapUnit === `px`) {
              marginsTotalSize +=
                (parentGapSize *
                  (this._currentElement.parentNode.children.length - 1)) /
                this._currentElement.parentNode.children.length;
            } else {
              marginsTotalSize =
                (parentTotalSize / 100) *
                (parentGapSize *
                  (this._currentElement.parentNode.children.length - 1));
            }
          } else {
            marginsTotalSize = 0;
            this._currentElement.parentNode.childNodes.forEach((child: any) => {
              if (parentDirection === `column`) {
                marginsTotalSize +=
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

              if (parentDirection === `row`) {
                marginsTotalSize +=
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
            });
          }
        } else {
          if (
            sibilingAttributes.filter((c) =>
              Object.keys(c).some((k) =>
                k.includes(
                  `pbfx-item-size${
                    this._isXS
                      ? '-x-s'
                      : this._isSM
                      ? '-s-m'
                      : this._isMD
                      ? '-m-d'
                      : this._isLG
                      ? '-l-g'
                      : this._isXL
                      ? '-x-l'
                      : ''
                  }`
                )
              )
            )[0]
          ) {
            sibilingSize = parseInt(
              Object.values<string>(
                sibilingAttributes.filter((c) =>
                  Object.keys(c).some((k) =>
                    k.includes(
                      `pbfx-item-size${
                        this._isXS
                          ? '-x-s'
                          : this._isSM
                          ? '-s-m'
                          : this._isMD
                          ? '-m-d'
                          : this._isLG
                          ? '-l-g'
                          : this._isXL
                          ? '-x-l'
                          : ''
                      }`
                    )
                  )
                )[0]
              )[0].replace(/[^0-9\\.]+/g, '')
            );

            sibilingUnit =
              Object.values<string>(
                sibilingAttributes.filter((c) =>
                  Object.keys(c).some((k) =>
                    k.includes(
                      `pbfx-item-size${
                        this._isXS
                          ? '-x-s'
                          : this._isSM
                          ? '-s-m'
                          : this._isMD
                          ? '-m-d'
                          : this._isLG
                          ? '-l-g'
                          : this._isXL
                          ? '-x-l'
                          : ''
                      }`
                    )
                  )
                )[0]
              )[0].search(/px/i) > 0
                ? `px`
                : `%`;
          } else {
            sibilingSize = parseInt(
              Object.values<string>(
                sibilingAttributes.filter((c) =>
                  Object.keys(c).some((k) => k.includes(`pbfx-item-size`))
                )[0]
              )[0].replace(/[^0-9\\.]+/g, '')
            );

            sibilingUnit =
              Object.values<string>(
                sibilingAttributes.filter((c) =>
                  Object.keys(c).some((k) => k.includes(`pbfx-item-size`))
                )[0]
              )[0].search(/px/i) > 0
                ? `px`
                : `%`;
          }

          if (sibilingUnit === `px`) {
            siblingsNoFillTotalSize += sibilingSize;
          } else {
            siblingsNoFillTotalSize += (parentTotalSize / 100) * sibilingSize;
          }
        }
      } else {
        // Enter here if sibiling NOT has pbFxSize

        if (parentDirection === `column`) {
          siblingsNoFillTotalSize =
            siblingsNoFillTotalSize +
            parseInt(
              window.getComputedStyle(child).height.replace(/[^0-9\\.]+/g, '')
            );
        }

        if (parentDirection === `row`) {
          siblingsNoFillTotalSize =
            siblingsNoFillTotalSize +
            parseInt(
              window.getComputedStyle(child).width.replace(/[^0-9\\.]+/g, '')
            );
        }
      }
    });

    this._size =
      ((parentTotalSize - siblingsNoFillTotalSize - marginsTotalSize) /
        qtdParentChildrenFillSize /
        parentTotalSize) *
      100;

    this._unitType = `%`;

    this.setItemSize();
  }
  // end calcFillSize(): void

  calcPercentSize(originalItemSize: number): void {
    const parentDirection = window.getComputedStyle(
      this._currentElement.parentNode
    ).flexDirection;
    let parentAttributes: any[] = [];
    let parentGapSize: number = 0;
    let parentGapUnit: string = ``;
    let parentTotalSize: number = 0;

    for (
      let i = 0;
      i < this._currentElement.parentNode.attributes.length;
      i++
    ) {
      parentAttributes.push(
        JSON.parse(
          `{ "${this._currentElement.parentNode.attributes[i].nodeName}": "${this._currentElement.parentNode.attributes[i].nodeValue}" }`
        )
      );
    }

    if (parentDirection === `column`) {
      parentTotalSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).height
      );
    }

    if (parentDirection === `row`) {
      parentTotalSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).width
      );
    }

    if (
      parentAttributes.filter((c) =>
        Object.keys(c).some((k) => k.includes(`pbfx-children-gap`))
      )[0]
    ) {
      parentGapSize = parseInt(
        Object.values<string>(
          parentAttributes.filter((c) =>
            Object.keys(c).some((k) => k.includes(`pbfx-children-gap`))
          )[0]
        )[0].replace(/[^0-9\\.]+/g, '')
      );

      parentGapUnit =
        Object.values<string>(
          parentAttributes.filter((c) =>
            Object.keys(c).some((k) => k.includes(`pbfx-children-gap`))
          )[0]
        )[0].search(/px/i) > 0
          ? `px`
          : `%`;

      if (parentGapUnit === `%`) {
        this._size =
          originalItemSize -
          (parentGapSize *
            (this._currentElement.parentNode.children.length - 1)) /
            this._currentElement.parentNode.children.length;
      } else {
        this._size =
          originalItemSize -
          ((parentGapSize / parentTotalSize) *
            100 *
            (this._currentElement.parentNode.children.length - 1)) /
            this._currentElement.parentNode.children.length;
      }
    } else {
      this._size = originalItemSize;
    }

    this.setItemSize();
  }
  // end calcPercentSize(): void

  setItemSize(): void {
    const parentDirection: string = window.getComputedStyle(
      this._currentElement.parentNode
    ).flexDirection;
    let parentSize: number = 0;

    if (parentDirection === `column` || parentDirection === `column-reverse`) {
      this._renderer2.setStyle(this._currentElement, `max-width`, ``);
      this._renderer2.setStyle(this._currentElement, `min-width`, ``);
      this._renderer2.setStyle(this._currentElement, `width`, ``);

      this._renderer2.setStyle(
        this._currentElement,
        `max-height`,
        `${this._size}${this._unitType}`
      );

      this._renderer2.setStyle(
        this._currentElement,
        `min-height`,
        `${this._size}${this._unitType}`
      );

      this._renderer2.setStyle(
        this._currentElement,
        `height`,
        `${this._size}${this._unitType}`
      );
    }

    if (parentDirection === `row` || parentDirection === `row-reverse`) {
      parentSize = parseInt(
        window.getComputedStyle(this._currentElement.parentNode).width
      );

      this._renderer2.setStyle(this._currentElement, `max-height`, ``);
      this._renderer2.setStyle(this._currentElement, `min-height`, ``);
      this._renderer2.setStyle(this._currentElement, `height`, ``);

      this._renderer2.setStyle(
        this._currentElement,
        `max-width`,
        `${this._size}${this._unitType}`
      );

      this._renderer2.setStyle(
        this._currentElement,
        `min-width`,
        `${this._size}${this._unitType}`
      );

      this._renderer2.setStyle(
        this._currentElement,
        `width`,
        `${this._size}${this._unitType}`
      );
    }
  }
  // end setItemSize(): void
}
