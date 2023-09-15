import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

const inputs = [
  'pbFxLayout',
  'pbFxLayout.xs',
  'pbFxLayout.sm',
  'pbFxLayout.md',
  'pbFxLayout.lg',
  'pbFxLayout.xl',
  'pbFxLayoutAlign',
  'pbFxLayoutAlign.xs',
  'pbFxLayoutAlign.sm',
  'pbFxLayoutAlign.md',
  'pbFxLayoutAlign.lg',
  'pbFxLayoutAlign.xl',
];
const selector = `
  [pbFxLayout],
  [pbFxLayout.xs],
  [pbFxLayout.sm],
  [pbFxLayout.md],
  [pbFxLayout.lg],
  [pbFxLayout.xl],
  [pbFxLayoutAlign],
  [pbFxLayoutAlign.xs],
  [pbFxLayoutAlign.sm],
  [pbFxLayoutAlign.md],
  [pbFxLayoutAlign.lg],
  [pbFxLayoutAlign.xl]
`;

@Directive({ inputs, selector })
export class PbFlexLayoutDirective implements OnChanges {
  @Input(`pbFxLayout`) public pbfxAlignDirection: string = ``;
  @Input(`pbFxLayout.xs`) public pbfxAlignDirectionXS: string = ``;
  @Input(`pbFxLayout.sm`) public pbfxAlignDirectionSM: string = ``;
  @Input(`pbFxLayout.md`) public pbfxAlignDirectionMD: string = ``;
  @Input(`pbFxLayout.lg`) public pbfxAlignDirectionLG: string = ``;
  @Input(`pbFxLayout.xl`) public pbfxAlignDirectionXL: string = ``;
  @Input(`pbFxLayoutAlign`) public pbfxAlignItems: string = ``;
  @Input(`pbFxLayoutAlign.xs`) public pbfxAlignItemsXS: string = ``;
  @Input(`pbFxLayoutAlign.sm`) public pbfxAlignItemsSM: string = ``;
  @Input(`pbFxLayoutAlign.md`) public pbfxAlignItemsMD: string = ``;
  @Input(`pbFxLayoutAlign.lg`) public pbfxAlignItemsLG: string = ``;
  @Input(`pbFxLayoutAlign.xl`) public pbfxAlignItemsXL: string = ``;

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
    switch (true) {
      case widthSize >= 0 && widthSize <= 599:
        this.pbfxAlignDirection = this.pbfxAlignDirectionXS
          ? this.pbfxAlignDirectionXS
          : this.pbfxAlignDirection;
        this.pbfxAlignItems = this.pbfxAlignItemsXS
          ? this.pbfxAlignItemsXS
          : this.pbfxAlignItems;
        break;

      case widthSize >= 600 && widthSize <= 959:
        this.pbfxAlignDirection = this.pbfxAlignDirectionSM
          ? this.pbfxAlignDirectionSM
          : this.pbfxAlignDirection;
        this.pbfxAlignItems = this.pbfxAlignItemsSM
          ? this.pbfxAlignItemsSM
          : this.pbfxAlignItems;
        break;

      case widthSize >= 960 && widthSize <= 1279:
        this.pbfxAlignDirection = this.pbfxAlignDirectionMD
          ? this.pbfxAlignDirectionMD
          : this.pbfxAlignDirection;
        this.pbfxAlignItems = this.pbfxAlignItemsMD
          ? this.pbfxAlignItemsMD
          : this.pbfxAlignItems;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        this.pbfxAlignDirection = this.pbfxAlignDirectionLG
          ? this.pbfxAlignDirectionLG
          : this.pbfxAlignDirection;
        this.pbfxAlignItems = this.pbfxAlignItemsLG
          ? this.pbfxAlignItemsLG
          : this.pbfxAlignItems;
        break;

      case widthSize >= 1920:
        this.pbfxAlignDirection = this.pbfxAlignDirectionXL
          ? this.pbfxAlignDirectionXL
          : this.pbfxAlignDirection;
        this.pbfxAlignItems = this.pbfxAlignItemsXL
          ? this.pbfxAlignItemsXL
          : this.pbfxAlignItems;
        break;
    }

    this.setAlignment();
  }
  // end setScreenType(): void

  setAlignment(): void {
    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      `box-sizing`,
      `border-box`
    );

    this._renderer2.setStyle(this._elementRef.nativeElement, `display`, `flex`);

    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      `flex-direction`,
      `${this.pbfxAlignDirection}`
    );

    let alignContent: string = ``;
    let alignItems: string = ``;
    let justifyContent: string = ``;

    // Align Items
    switch (this.pbfxAlignItems.split(' ')[0]) {
      case 'start':
      case 'flex-start':
        alignContent = 'flex-start';
        alignItems = 'flex-start';
        break;
      case 'center':
        alignContent = 'center';
        alignItems = 'center';
        break;
      case 'end':
      case 'flex-end':
        alignContent = 'flex-end';
        alignItems = 'flex-end';
        break;
      case 'stretch':
      default:
        alignContent = 'stretch';
        alignItems = 'stretch';
        break;
    }

    // Justify Content
    switch (this.pbfxAlignItems.split(' ')[1]) {
      case 'center':
        justifyContent = 'center';
        break;
      case 'space-around':
        justifyContent = 'space-around';
        break;
      case 'space-between':
        justifyContent = 'space-between';
        break;
      case 'space-evenly':
        justifyContent = 'space-evenly';
        break;
      case 'end':
      case 'flex-end':
        justifyContent = 'flex-end';
        break;
      case 'stretch':
        justifyContent = 'stretch';
        break;
      case 'start':
      case 'flex-start':
      default:
        justifyContent = 'flex-start';
        break;
    }

    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      `align-content`,
      `${alignContent}`
    );

    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      `align-items`,
      `${alignItems}`
    );

    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      `justify-content`,
      `${justifyContent}`
    );

    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      `place-content`,
      `${alignContent} ${justifyContent}`
    );
  }
  // end setAlignment(): void
}
