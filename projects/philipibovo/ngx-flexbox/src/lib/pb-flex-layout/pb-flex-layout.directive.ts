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
  private _currentElement: any;
  private _directiveDirectionContent: string = ``;
  private _directiveAlignItemsContent: string = ``;

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
        this._directiveDirectionContent = this.pbfxAlignDirectionXS
          ? this.pbfxAlignDirectionXS
          : this.pbfxAlignDirection;
        this._directiveAlignItemsContent = this.pbfxAlignItemsXS
          ? this.pbfxAlignItemsXS
          : this.pbfxAlignItems;
        break;

      case widthSize >= 600 && widthSize <= 959:
        this._directiveDirectionContent = this.pbfxAlignDirectionSM
          ? this.pbfxAlignDirectionSM
          : this.pbfxAlignDirection;
        this._directiveAlignItemsContent = this.pbfxAlignItemsSM
          ? this.pbfxAlignItemsSM
          : this.pbfxAlignItems;
        break;

      case widthSize >= 960 && widthSize <= 1279:
        this._directiveDirectionContent = this.pbfxAlignDirectionMD
          ? this.pbfxAlignDirectionMD
          : this.pbfxAlignDirection;
        this._directiveAlignItemsContent = this.pbfxAlignItemsMD
          ? this.pbfxAlignItemsMD
          : this.pbfxAlignItems;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        this._directiveDirectionContent = this.pbfxAlignDirectionLG
          ? this.pbfxAlignDirectionLG
          : this.pbfxAlignDirection;
        this._directiveAlignItemsContent = this.pbfxAlignItemsLG
          ? this.pbfxAlignItemsLG
          : this.pbfxAlignItems;
        break;

      case widthSize >= 1920:
        this._directiveDirectionContent = this.pbfxAlignDirectionXL
          ? this.pbfxAlignDirectionXL
          : this.pbfxAlignDirection;
        this._directiveAlignItemsContent = this.pbfxAlignItemsXL
          ? this.pbfxAlignItemsXL
          : this.pbfxAlignItems;
        break;
    }

    this.setAlignment();
  }
  // end setScreenType(): void

  setAlignment(): void {
    const flags = RendererStyleFlags2.DashCase | RendererStyleFlags2.Important;

    let alignItems: string = ``;
    let justifyContent: string = ``;

    // Align Items
    switch (this._directiveAlignItemsContent.split(' ')[0]) {
      case 'start':
      case 'flex-start':
        alignItems = 'flex-start';
        break;
      case 'center':
        alignItems = 'center';
        break;
      case 'end':
      case 'flex-end':
        alignItems = 'flex-end';
        break;
      case 'stretch':
      default:
        alignItems = 'stretch';
        break;
    }

    // Justify Content
    switch (this._directiveAlignItemsContent.split(' ')[1]) {
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
      case 'start':
      case 'flex-start':
      default:
        justifyContent = 'flex-start';
        break;
    }

    this._renderer2.removeStyle(this._currentElement, `box-sizing`);
    this._renderer2.removeStyle(this._currentElement, `display`);
    this._renderer2.removeStyle(this._currentElement, `flex-direction`);
    this._renderer2.removeStyle(this._currentElement, `align-items`);
    this._renderer2.removeStyle(this._currentElement, `justify-content`);

    this._renderer2.setStyle(
      this._currentElement,
      `box-sizing`,
      `border-box`,
      flags
    );

    this._renderer2.setStyle(this._currentElement, `display`, `flex`, flags);

    this._renderer2.setStyle(
      this._currentElement,
      `flex-direction`,
      this._directiveDirectionContent,
      flags
    );

    this._renderer2.setStyle(
      this._currentElement,
      `align-items`,
      alignItems,
      flags
    );

    this._renderer2.setStyle(
      this._currentElement,
      `justify-content`,
      justifyContent,
      flags
    );
  }
  // end setAlignment(): void
}
