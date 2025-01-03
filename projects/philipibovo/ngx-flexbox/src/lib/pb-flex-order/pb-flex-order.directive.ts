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
  'pbFxOrder',
  'pbFxOrder.xs',
  'pbFxOrder.sm',
  'pbFxOrder.md',
  'pbFxOrder.lg',
  'pbFxOrder.xl',
];

const selector = `
  [pbFxOrder],
  [pbFxOrder.xs],
  [pbFxOrder.sm],
  [pbFxOrder.md],
  [pbFxOrder.lg],
  [pbFxOrder.xl],
`;

@Directive({ inputs, selector, standalone: false })
export class PbFlexOrderDirective implements OnChanges, OnInit {
  @Input(`pbFxOrder`) public pbfxItemOrder: string | null = null;
  @Input(`pbFxOrder.xs`) public pbfxItemOrderXS: string | null = null;
  @Input(`pbFxOrder.sm`) public pbfxItemOrderSM: string | null = null;
  @Input(`pbFxOrder.md`) public pbfxItemOrderMD: string | null = null;
  @Input(`pbFxOrder.lg`) public pbfxItemOrderLG: string | null = null;
  @Input(`pbFxOrder.xl`) public pbfxItemOrderXL: string | null = null;
  private _currentElement: any;
  private _directiveContent: string = ``;
  private _order: number = 0;
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
        if (!this.pbfxItemOrder && !this.pbfxItemOrderXS) {
          return;
        }

        this._directiveContent = this.pbfxItemOrderXS
          ? this.pbfxItemOrderXS
          : this.pbfxItemOrder!;
        break;

      case widthSize >= 768 && widthSize <= 1023:
        if (!this.pbfxItemOrder && !this.pbfxItemOrderSM) {
          return;
        }

        this._directiveContent = this.pbfxItemOrderSM
          ? this.pbfxItemOrderSM
          : this.pbfxItemOrder!;
        break;

      case widthSize >= 1024 && widthSize <= 1279:
        if (!this.pbfxItemOrder && !this.pbfxItemOrderMD) {
          return;
        }

        this._directiveContent = this.pbfxItemOrderMD
          ? this.pbfxItemOrderMD
          : this.pbfxItemOrder!;
        break;

      case widthSize >= 1280 && widthSize <= 1919:
        if (!this.pbfxItemOrder && !this.pbfxItemOrderLG) {
          return;
        }

        this._directiveContent = this.pbfxItemOrderLG
          ? this.pbfxItemOrderLG
          : this.pbfxItemOrder!;
        break;

      case widthSize >= 1920:
        if (!this.pbfxItemOrder && !this.pbfxItemOrderXL) {
          return;
        }

        this._directiveContent = this.pbfxItemOrderXL
          ? this.pbfxItemOrderXL
          : this.pbfxItemOrder!;
        break;
    }

    this._order = parseInt(this._directiveContent!.replace(/[^\d.-]+/g, ''));

    setTimeout(() => {
      this.setItemOrder();
    }, 0);
  }
  // end setScreenType(): void

  setItemOrder(): void {
    this._renderer2.removeStyle(this._currentElement, `order`);
    this._renderer2.setStyle(this._currentElement, `order`, this._order);
  }
  // end setItemOrder(): void
}
